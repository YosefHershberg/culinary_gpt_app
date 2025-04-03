import { useCallback, useEffect } from 'react'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

import useOptAddUserIngredient from '../optimistic/useOptAddUserIngredient'
import useOptDeleteUserIngredient from '../optimistic/useOptDeleteUserIngredient'
import useOptDeleteAllUserIngredients from '../optimistic/useOptDeleteAllUserIngredients'
import useOptAddMultipleIngredients from '../optimistic/useOptAddMultipleIngredients'

import { getUserIngredients } from '@/services/ingredient.service'
import { Ingredient } from '@/lib/types'
import { toast } from '@/components/ui/use-toast'

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

    const addUserIngredientMutation = useOptAddUserIngredient()
    const deleteUserIngredientMutation = useOptDeleteUserIngredient()
    const deleteAllUserIngredientsMutation = useOptDeleteAllUserIngredients()
    const addMultipleIngredientsMutation = useOptAddMultipleIngredients()

    const { data: userIngredients, error } = useSuspenseQuery({
        queryKey: ['userIngredients'],
        queryFn: () => getUserIngredients(),
    })

    useEffect(() => {
        if (error) throw error
    }, [error]);

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

        //Getting the common ingredients from the cache
        const commonIngredients = queryClient.getQueryData(['common-ingredient-suggestions']) as Ingredient[]

        addMultipleIngredients(commonIngredients)
    }, [queryClient, addMultipleIngredients])

    /**
     * @description Filters out ingredients that are already in the user's ingredients
     * @param ingredients 
     * @returns 
     */
    const filterExistingIngredients = useCallback((ingredients: Ingredient[]): Ingredient[] => {
        //using a set for faster lookup. O(n) instead of O(n^2)
        const userIngredientIds = new Set(userIngredients?.map((ingredient: Ingredient) => ingredient.id));
        return ingredients.filter((ingredient: Ingredient) => !userIngredientIds.has(ingredient.id));
    }, [userIngredients])

    const deleteUserIngredient = useCallback((ingredient: Ingredient) => {
        console.log('deleting ingredient', ingredient);
        deleteUserIngredientMutation.mutate(ingredient)
    }, [deleteUserIngredientMutation])

    const deleteAllUserIngredients = useCallback(() => {
        console.log('removing all ingredients');
        deleteAllUserIngredientsMutation.mutate(null)
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