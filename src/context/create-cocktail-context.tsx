import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useUserData } from '@/context/user-data-context';
import useCreateItemStream from '@/hooks/componentHooks/useCreateItemStream';

import { toast } from '@/components/ui/use-toast';
import LoadingRecipePage from '@/pages/LoadingRecipePage';

type CreateCocktailContextValue = {
    handleSubmit: (prompt: string) => void;
    isLoading: boolean;
};

export const CreateCocktailContext = createContext<CreateCocktailContextValue | undefined>(undefined);

export const CreateCocktailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userIngredients } = useUserData();
    const [prompt, setPrompt] = useState<string>('');
    const navigate = useNavigate();

    const { trigger, isLoadingItem } = useCreateItemStream<{
        prompt: string;
    }>({
        endpoint: '/user/recipes/create-cocktail',
        params: { prompt },
        onSuccess: (newCocktail) => {
            setPrompt('');
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
    });

    const handlePromptChange = useCallback((value: string) => {
        setPrompt(value);
    }, []);

    const handleSubmit = useCallback(() => {
        const drinkIngredients = userIngredients.filter(ingredient => 
            ingredient.type?.includes('drink')
        );
        
        if (drinkIngredients.length < 4) {
            return toast({
                variant: 'destructive',
                title: 'Oops! You need more ingredients!',
                description: 'You need at least 4 drink ingredients to create a cocktail.'
            });
        }

        trigger();
    }, [userIngredients, trigger]);

    const contextValue = useMemo(() => ({
        handleSubmit,
        handlePromptChange,
        prompt,
        isLoading: isLoadingItem,
    }), [
        handleSubmit,
        handlePromptChange,
        prompt,
        isLoadingItem,
    ]);

    if (isLoadingItem) return <LoadingRecipePage duration={600} />;

    return (
        <CreateCocktailContext.Provider value={contextValue}>
            {children}
        </CreateCocktailContext.Provider>
    );
};

export const useCreateCocktail = () => {
    const context = useContext(CreateCocktailContext);
    
    if (context === undefined) {
        throw new Error(
            'useCreateCocktail must be used within a CreateCocktailProvider. ' +
            'Make sure your component is wrapped in the provider.'
        );
    }
    
    return context;
};