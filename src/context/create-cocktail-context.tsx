import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import useCreateItemStream from '@/hooks/componentHooks/useCreateItemStream';

import { toast } from '@/components/ui/use-toast';
import LoadingRecipePage from '@/pages/LoadingRecipePage';

import type { Ingredient } from '@/lib/types';
import { INGREDIENTS_QUERY_KEY } from '@/lib/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

type CreateCocktailContextValue = {
    handleSubmit: (prompt: string) => void;
    isLoading: boolean;
};

export const CreateCocktailContext = createContext<CreateCocktailContextValue | undefined>(undefined);

export const CreateCocktailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [prompt, setPrompt] = useState<string>('');
    
    const { execute, isLoadingItem } = useCreateItemStream({
        endpoint: '/user/recipes/create-cocktail',
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
        const userIngredients = queryClient.getQueryData<Ingredient[]>(INGREDIENTS_QUERY_KEY) || [];

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

        execute({ prompt });
    }, [execute, prompt]);

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