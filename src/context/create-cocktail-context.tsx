import { createContext, useContext, useState } from 'react';
import { useUserData } from '@/context/user-data-context';
import { toast } from '@/components/ui/use-toast';
import LoadingRecipePage from '@/pages/LoadingRecipePage';
import { useNavigate } from '@tanstack/react-router';
import useCreateItemStream from '@/hooks/componentHooks/useCreateItemStream';

type CreateCocktailState = {
    handleSubmit: () => void,
    handlePromptChange: (value: string) => void,
    prompt: string
}

export const CreateCocktailContext = createContext<CreateCocktailState>(undefined as any);

export const CreateCocktailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userIngredients } = useUserData()
    const [prompt, setPrompt] = useState<string>('')
    const navigate = useNavigate()

    const { trigger, isLoadingItem } = useCreateItemStream<{
        prompt: string
    }>({
        endpoint: '/user/recipes/create-cocktail',
        params: {
            prompt
        },
        onSuccess: (newCocktail) => {
            setPrompt('')
            navigate({
                to: '/recipe',
                state: newCocktail as any,
            });
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-expect-error
                description: error?.response?.data?.message || `Failed to create cocktail.`,
            });
        }

    })

    const handlePromptChange = (value: string) => {
        setPrompt(value)
    }

    const handleSubmit = () => {
        const foodIngredients = userIngredients.filter(ingredient => ingredient.type?.includes('drink'))
        if (foodIngredients.length < 4) {
            return toast({
                variant: 'destructive',
                title: 'Oops! You need more ingredients!',
                description: 'You need at least 4 ingredients to create a recipe.'
            })
        }

        trigger()
    }

    if (isLoadingItem) return <LoadingRecipePage duration={600} />

    return (
        <CreateCocktailContext.Provider value={{
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