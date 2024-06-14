import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingRecipePage from "@/pages/LoadingRecipePage";
import useHttpClient from "@/hooks/useHttpClient";
import { toast } from "@/components/ui/use-toast";
import { set } from "zod";

type CreateRecipeState = {
    mealSelected: Meals,
    selectedTime: number,
    prompt: string,
    handleMealSelected: (value: Meals) => void,
    handleTimeChange: (value: number[]) => void,
    handlePromptChange: (value: string) => void,
    handleSubmit: () => void
}

export const CreateRecipeContext = createContext<CreateRecipeState>(undefined as any);

export type Meals = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'

export const CreateRecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mealSelected, setMealSelected] = useState<Meals>('lunch')
    const [selectedTime, setSelectedTime] = useState<number>(50)
    const [prompt, setPrompt] = useState<string>('')

    const navigate = useNavigate()

    const { data: createdRecipe, isLoading, error, responseStatus ,triggerHttpReq } = useHttpClient({
        endpoint: '/create-recipe',
        method: 'POST',
        body: {
            mealSelected, selectedTime, prompt
        }
    })

    useEffect(() => {
        if (responseStatus === 200 && createdRecipe) {
            setPrompt('')
            setSelectedTime(50)
            setMealSelected('lunch')
            console.log('createdRecipe', createdRecipe);
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
            handleMealSelected,
            handleTimeChange,
            handlePromptChange,
            handleSubmit
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