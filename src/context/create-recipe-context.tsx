import { createContext, useContext, useEffect, useState } from "react";

import LoadingRecipePage from "@/pages/LoadingRecipePage";
import { toast } from "@/components/ui/use-toast";
import { useUserData } from "./user-data-context";
import useCreateRecipeStream from "@/hooks/componentHooks/useCreateRecipe";
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

    const [newRecipe, setNewRecipe] = useState<RecipeState>(initialRecipeState)

    const { trigger, recipe, isLoadingRecipe } = useCreateRecipeStream({
        mealSelected: newRecipe.mealSelected,
        selectedTime: newRecipe.selectedTime,
        prompt: newRecipe.prompt,
        numOfPeople: newRecipe.numOfPeople
    })

    useEffect(() => {
        if (recipe) {
            setNewRecipe(initialRecipeState);
            navigate({ to: '/recipe', state: recipe as any });
        }
        // NOTE: Don't put navigate fnc in deps arr. It creates bugs in nav from save recipe to my recipes
    }, [recipe]);

    const handleNumOfPeopleChange = (value: number) => {
        setNewRecipe(prev => ({ ...prev, numOfPeople: value }))
    }

    const handleMealSelected = (value: Meals) => {
        setNewRecipe(prev => ({ ...prev, mealSelected: value }))
    }

    const handleTimeChange = (value: number[]) => {
        setNewRecipe(prev => ({ ...prev, selectedTime: value[0] }))
    }

    const handlePromptChange = (value: string) => {
        setNewRecipe(prev => ({ ...prev, prompt: value }))
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

        if (newRecipe.numOfPeople < 1) {
            return toast({
                variant: 'destructive',
                title: 'Oops! You need more people!',
                description: 'You need at least 1 person to create a recipe.'
            })
        }
        trigger()
    }

    if (isLoadingRecipe) return <LoadingRecipePage duration={1000} />

    return (
        <CreateRecipeContext.Provider value={{
            mealSelected: newRecipe.mealSelected,
            selectedTime: newRecipe.selectedTime,
            prompt: newRecipe.prompt,
            numOfPeople: newRecipe.numOfPeople,
            recipe,
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