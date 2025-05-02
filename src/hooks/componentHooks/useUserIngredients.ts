import { useCallback } from 'react'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import useOptimisticMutation from '@/hooks/useOptimisticMutation'

import {
    getUserIngredientsAPI,
    addUserIngredientAPI,
    deleteUserIngredientAPI,
    deleteAllUserIngredientsAPI,
    addMultipleUserIngredientsAPI
} from '@/services/ingredient.service'
import { toast } from '@/components/ui/use-toast'
import { INGREDIENTS_QUERY_KEY, QueryKeys } from '@/lib/queryKeys'

import type { Ingredient, MessageResponse } from '@/lib/types'

export type UseUserIngredientsReturnType = {
    userIngredients: Ingredient[];
    addUserIngredient: (ingredient: Ingredient) => void;
    addCommonIngredients: () => void;
    addMultipleIngredients: (ingredients: Ingredient[]) => void;
    deleteUserIngredient: (ingredient: Ingredient) => void;
    deleteAllUserIngredients: () => void;
}

const useUserIngredients = (): UseUserIngredientsReturnType => {
    const queryClient = useQueryClient()

    const addUserIngredientMutation = useOptimisticMutation<Ingredient, Ingredient, Ingredient[]>({
        queryKey: INGREDIENTS_QUERY_KEY,
        mutation: (ingredient: Ingredient) => addUserIngredientAPI(ingredient),
        optimisticUpdate: (ingredient, prevData = []) => {
            return [...prevData, ingredient]
        },
        errorMessage: 'An error occurred while adding ingredient.'
    })

    const deleteUserIngredientMutation = useOptimisticMutation<Ingredient, MessageResponse, Ingredient[]>({
        queryKey: INGREDIENTS_QUERY_KEY,
        mutation: (ingredient: Ingredient) => deleteUserIngredientAPI(ingredient),
        optimisticUpdate: (ingredient, prevData = []) => {
            return prevData.filter(ing => ing.id !== ingredient.id)
        },
        errorMessage: 'An error occurred while deleting ingredient.'
    })

    const deleteAllUserIngredientsMutation = useOptimisticMutation<undefined, MessageResponse, Ingredient[]>({
        queryKey: INGREDIENTS_QUERY_KEY,
        mutation: () => deleteAllUserIngredientsAPI(),
        optimisticUpdate: () => {
            return []
        },
        errorMessage: 'An error occurred while deleting all ingredients.'
    })

    const addMultipleIngredientsMutation = useOptimisticMutation<Ingredient[], Ingredient[], Ingredient[]>({
        queryKey: INGREDIENTS_QUERY_KEY,
        mutation: (ingredients: Ingredient[]) => addMultipleUserIngredientsAPI(ingredients),
        optimisticUpdate: (ingredients, prevData = []) => {
            return [...prevData, ...ingredients]
        },
        errorMessage: 'An error occurred while adding ingredients.',
        onSuccess: (data) => {
            toast({
                variant: 'default',
                title: 'Ingredients added!',
                description: `${data.length} ingredients added.`
            })
        }
    })

    const { data: userIngredients } = useSuspenseQuery({
        queryKey: INGREDIENTS_QUERY_KEY,
        queryFn: () => getUserIngredientsAPI(),
    })

    const addUserIngredient = useCallback((ingredient: Ingredient) => {
        console.log('adding ingredient', ingredient);
        addUserIngredientMutation.mutate(ingredient)
    }, [addUserIngredientMutation])


    const addMultipleIngredients = useCallback((ingredients: Ingredient[]) => {
        const missingIngredients = filterExistingIngredients(ingredients)

        if (missingIngredients.length === 0) {
            return toast({
                variant: 'default',
                title: 'No new ingredients to add!'
            })
        }
        addMultipleIngredientsMutation.mutate(missingIngredients)
    }, [addMultipleIngredientsMutation])

    const addCommonIngredients = useCallback(() => {
        console.log('adding common ingredients');

        // Getting the common ingredients from the cache
        const commonIngredients = queryClient.getQueryData<Ingredient[]>(QueryKeys.IngredientSuggestions('common')) || [];

        addMultipleIngredients(commonIngredients)
    }, [queryClient, addMultipleIngredients])

    /**
     * @description Filters out ingredients that are already in the user's ingredients
     * @param ingredients 
     * @returns 
     */
    const filterExistingIngredients = useCallback((ingredients: Ingredient[]): Ingredient[] => {
        // Using a set for faster lookup. O(n) instead of O(n^2)
        const userIngredientIds = new Set(userIngredients?.map((ingredient: Ingredient) => ingredient.id));
        return ingredients.filter((ingredient: Ingredient) => !userIngredientIds.has(ingredient.id));
    }, [userIngredients])

    const deleteUserIngredient = useCallback((ingredient: Ingredient) => {
        console.log('deleting ingredient', ingredient);
        deleteUserIngredientMutation.mutate(ingredient)
    }, [deleteUserIngredientMutation])

    const deleteAllUserIngredients = useCallback(() => {
        console.log('removing all ingredients');
        deleteAllUserIngredientsMutation.mutate(undefined)
    }, [deleteAllUserIngredientsMutation])

    return {
        userIngredients: userIngredients || [],
        addUserIngredient,
        addCommonIngredients,
        addMultipleIngredients,
        deleteUserIngredient,
        deleteAllUserIngredients
    }
}

export default useUserIngredients