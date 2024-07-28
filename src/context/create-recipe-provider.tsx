import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingRecipePage from "@/pages/LoadingRecipePage";
import useHttpClient from "@/hooks/useHttpClient";
import { toast } from "@/components/ui/use-toast";
import { Recipe } from "@/lib/types";

type CreateRecipeState = {
    mealSelected: Meals,
    selectedTime: number,
    prompt: string,
    numOfPeople: number,
    createdRecipe: Recipe | null,
    handleMealSelected: (value: Meals) => void,
    handleTimeChange: (value: number[]) => void,
    handlePromptChange: (value: string) => void,
    handleSubmit: () => void,
    handleNumOfPeopleChange: (value: number) => void,
}

export const CreateRecipeContext = createContext<CreateRecipeState>(undefined as any);

export type Meals = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'

export const CreateRecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [createdRecipe, setCreatedRecipe] = useState<Recipe | null>(null) // TODO: Can this be a ref?
    const [mealSelected, setMealSelected] = useState<Meals>('lunch')
    const [selectedTime, setSelectedTime] = useState<number>(50)
    const [numOfPeople, setNumOfPeople] = useState<number>(2)
    const [prompt, setPrompt] = useState<string>('')

    const navigate = useNavigate()

    const { data: response, isLoading, error, responseStatus ,triggerHttpReq } = useHttpClient({
        endpoint: '/user/recipes/create',
        method: 'POST',
        body: {
            mealSelected, selectedTime, prompt, numOfPeople
        }
    })

    useEffect(() => {
        if (responseStatus === 200 && response) {
            setPrompt('')
            setSelectedTime(50)
            setMealSelected('lunch')
            setCreatedRecipe(response)
            navigate('/recipe')
        }
    }, [responseStatus]);

    useEffect(() => {
        if (error) {
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-ignore
                description: error.response?.data?.message || 'An error occurred while creating your recipe.'
            })
        }
    }, [error]);

    const handleNumOfPeopleChange = (value: number) => {
        setNumOfPeople(value)
    }

    const handleMealSelected = (value: Meals) => {
        setMealSelected(value)
    }

    const handleTimeChange = (value: number[]) => {
        setSelectedTime(value[0] + 5)
    }

    const handlePromptChange = (value: string) => {
        setPrompt(value)
    }

    const handleSubmit = () => {
        triggerHttpReq()
    }

    if (isLoading) return <LoadingRecipePage />

    return (
        <CreateRecipeContext.Provider value={{
            mealSelected,
            selectedTime,
            prompt,
            numOfPeople,
            handleMealSelected,
            handleTimeChange,
            handlePromptChange,
            handleSubmit,
            handleNumOfPeopleChange,
            createdRecipe
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