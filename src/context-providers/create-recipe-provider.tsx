import { createContext, useContext, useEffect, useState } from "react";
import useHttpClient from "@/hooks/useHttpClient";
import { toast } from "@/components/ui/use-toast";

type CreateRecipeState = {
    mealSelected: Meals,
    selectedTime: number,
    prompt: string,
    handleMealSelected: (value: Meals) => void,
    handleTimeChange: (value: number[]) => void,
    handlePromptChange: (value: string) => void,
    handleSubmit: () => void
}

export const CreateRecipeContext = createContext<CreateRecipeState>(null as any);

export type Meals = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'

export const CreateRecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mealSelected, setMealSelected] = useState<Meals>('lunch')
    const [selectedTime, setSelectedTime] = useState<number>(50)
    const [prompt, setPrompt] = useState<string>('')

    const { data: result, isLoading, error, triggerHttpReq } = useHttpClient({
        endpoint: '/api/create-recipe',
        method: 'POST',
        body: {
            mealSelected, selectedTime
        }
    })

    useEffect(() => {
        if (error) {
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-ignore
                description: error.response?.data?.message || 'An error occurred while searching for ingredients.'
            })
        }
    }, [error]);

    useEffect(() => {

    }, [result]);

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
        console.log('submit')
        console.log(mealSelected, selectedTime);
        triggerHttpReq()
    }

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