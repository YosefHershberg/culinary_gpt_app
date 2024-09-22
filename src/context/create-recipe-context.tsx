import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingRecipePage from "@/pages/LoadingRecipePage";
import useHttpClient from "@/hooks/useHttpClient";
import { toast } from "@/components/ui/use-toast";
import { useUserData } from "./user-data-context";

type CreateRecipeState = {
    mealSelected: Meals,
    selectedTime: number,
    prompt: string,
    numOfPeople: number,
    handleMealSelected: (value: Meals) => void,
    handleTimeChange: (value: number[]) => void,
    handlePromptChange: (value: string) => void,
    handleSubmit: () => void,
    handleNumOfPeopleChange: (value: number) => void,
}

export const CreateRecipeContext = createContext<CreateRecipeState>(undefined as any);

export type Meals = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'

export const CreateRecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const { userIngredients } = useUserData()

    const [mealSelected, setMealSelected] = useState<Meals>('lunch')
    const [selectedTime, setSelectedTime] = useState<number>(50)
    const [numOfPeople, setNumOfPeople] = useState<number>(2)
    const [prompt, setPrompt] = useState<string>('')

    const { data: response, isLoading, error, responseStatus, triggerHttpReq } = useHttpClient({
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
            navigate('/recipe', { state: response })    
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
        const foodIngredients = userIngredients.filter(ingredient => ingredient.type.includes('food'))
        if (foodIngredients.length < 4) {
            return toast({
                variant: 'destructive',
                title: 'Oops! You need more ingredients!',
                description: 'You need at least 4 ingredients to create a recipe.'
            })
        }

        if (numOfPeople < 1) {
            return toast({
                variant: 'destructive',
                title: 'Oops! You need more people!',
                description: 'You need at least 1 person to create a recipe.'
            })
        }

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