import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '@/context/user-data-context';
import useCreateCocktailStream from '@/hooks/componentHooks/useCreateCocktail';
import { toast } from '@/components/ui/use-toast';
import { RecipeState } from '@/lib/types';
import LoadingRecipePage from '@/pages/LoadingRecipePage';

type CreateCocktailState = {
    createdCocktail: RecipeState | null,
    handleSubmit: () => void,
    handlePromptChange: (value: string) => void,
    prompt: string
}

export const CreateCocktailContext = createContext<CreateCocktailState>(undefined as any);

export const CreateCocktailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const { userIngredients } = useUserData()

    const [createdCocktail, setCreatedCocktail] = useState<RecipeState | null>(null)
    const [prompt, setPrompt] = useState<string>('')

    const { trigger, recipe, isLoadingRecipe } = useCreateCocktailStream({
        prompt
    })

    useEffect(() => {
        if (recipe) {
            setPrompt('')
            setCreatedCocktail(recipe)
            navigate('/recipe', { state: recipe })
        }
    }, [recipe]);

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

        trigger()
    }

    if (isLoadingRecipe) return <LoadingRecipePage duration={1200} />

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