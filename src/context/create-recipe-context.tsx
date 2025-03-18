import { createContext, useContext, useState } from "react";

import LoadingRecipePage from "@/pages/LoadingRecipePage";
import { toast } from "@/components/ui/use-toast";
import { useUserData } from "./user-data-context";
import useCreateRecipeStream from "@/hooks/componentHooks/useCreateItemStream";
import { Meals, RecipeState, RecipeWithImage } from "@/lib/types";
import { useNavigate } from "@tanstack/react-router";

type CreateRecipeWithImage = {
    mealSelected: Meals,
    selectedTime: number,
    prompt: string,
    numOfPeople: number,
    handleMealSelected: (value: Meals) => void,
    handleTimeChange: (value: number[]) => void,
    handlePromptChange: (value: string) => void,
    handleSubmit: () => void,
    handleNumOfPeopleChange: (value: number) => void,
    recipe: RecipeWithImage | null,
}

const initialRecipeState: RecipeState = {
    mealSelected: 'lunch',
    selectedTime: 50,
    prompt: '',
    numOfPeople: 2
}

export const CreateRecipeContext = createContext<CreateRecipeWithImage>(undefined as any);

export const CreateRecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const { userIngredients } = useUserData()

    const [recipeState, setRecipeState] = useState<RecipeState>(initialRecipeState)

    const { trigger, item: newRecipe, isLoadingItem } = useCreateRecipeStream<
        RecipeState
    >({
        endpoint: '/user/recipes/create',
        params: recipeState,
        onSuccess: (newRecipe) => {
            setRecipeState(initialRecipeState);
            navigate({
                to: '/recipe',
                state: newRecipe as any,
                replace: true
            });
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-expect-error
                description: error?.response?.data?.message || `Failed to create recipe.`,
            });
        }
    })

    const handleNumOfPeopleChange = (value: number) => {
        setRecipeState(prev => ({ ...prev, numOfPeople: value }))
    }

    const handleMealSelected = (value: Meals) => {
        setRecipeState(prev => ({ ...prev, mealSelected: value }))
    }

    const handleTimeChange = (value: number[]) => {
        setRecipeState(prev => ({ ...prev, selectedTime: value[0] }))
    }

    const handlePromptChange = (value: string) => {
        setRecipeState(prev => ({ ...prev, prompt: value }))
    }

    const handleSubmit = () => {
        const foodIngredients = userIngredients.filter(ingredient => ingredient.type?.includes('food'))
        if (foodIngredients.length < 4) {
            return toast({
                variant: 'destructive',
                title: 'Oops! You need more ingredients!',
                description: 'You need at least 4 ingredients to create a recipe.'
            })
        }

        if (recipeState.numOfPeople < 1) {
            return toast({
                variant: 'destructive',
                title: 'Oops! You need more people!',
                description: 'You need at least 1 person to create a recipe.'
            })
        }
        trigger()
    }

    if (isLoadingItem) return <LoadingRecipePage duration={1000} />

    return (
        <CreateRecipeContext.Provider value={{
            mealSelected: recipeState.mealSelected,
            selectedTime: recipeState.selectedTime,
            prompt: recipeState.prompt,
            numOfPeople: recipeState.numOfPeople,
            recipe: newRecipe,
            handleMealSelected,
            handleTimeChange,
            handlePromptChange,
            handleSubmit,
            handleNumOfPeopleChange,
        }}>
            {children}
        </CreateRecipeContext.Provider>
    )
}

export const useCreateRecipe = () => {
    const context = useContext(CreateRecipeContext)

    if (context === undefined)
        throw new Error("useCreateRecipe must be used within a CreateRecipeProvider")

    return context
}