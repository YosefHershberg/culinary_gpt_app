import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttpClient from '@/hooks/useHttpClient';
import { useUserData } from '@/context/user-data-context';
import { toast } from '@/components/ui/use-toast';
import { RecipeWithImage } from '@/lib/types';
import LoadingRecipePage from '@/pages/LoadingRecipePage';

type CreateCocktailState = {
    createdCocktail: RecipeWithImage | null,
    handleSubmit: () => void,
    handlePromptChange: (value: string) => void,
    prompt: string
}

export const CreateCocktailContext = createContext<CreateCocktailState>(undefined as any);

export const CreateCocktailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const { userIngredients } = useUserData()

    const [createdCocktail, setCreatedCocktail] = useState<RecipeWithImage | null>(null)
    const [prompt, setPrompt] = useState<string>('')

    const { data: response, isLoading, error, responseStatus, triggerHttpReq } = useHttpClient({
        endpoint: '/user/recipes/create-cocktail',
        method: 'POST',
        body: { prompt }
    })

    useEffect(() => {
        if (responseStatus === 200 && response) {
            console.log(response)
            setPrompt('')
            setCreatedCocktail(response)
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

    const handlePromptChange = (value: string) => {
        setPrompt(value)
    }

    const handleSubmit = () => {
        const foodIngredients = userIngredients.filter(ingredient => ingredient.type.includes('drink'))
        if (foodIngredients.length < 4) {
            return toast({
                variant: 'destructive',
                title: 'Oops! You need more ingredients!',
                description: 'You need at least 4 ingredients to create a recipe.'
            })
        }

        triggerHttpReq()
    }

    if (isLoading) return <LoadingRecipePage />

    return (
        <CreateCocktailContext.Provider value={{
            createdCocktail,
            handleSubmit,
            handlePromptChange,
            prompt
        }}>
            {children}
        </CreateCocktailContext.Provider>
    )
}

export const useCreateCocktail = () => {
    const context = useContext(CreateCocktailContext)
    if (!context) {
        throw new Error('useCreateCocktail must be used within a CreateCocktailProvider')
    }
    return context
}