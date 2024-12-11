import { useAuth } from '@/context/auth-context'
import { getUserIngredients } from '@/services/ingredient.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Ingredient } from '@/lib/types'

import useOptAddUserIngredient from './optimistic/useOptAddUserIngredient'
import useOptDeleteUserIngredient from './optimistic/useOptDeleteUserIngredient'
import useOptDeleteAllUserIngredients from './optimistic/useOptDeleteAllUserIngredients'
import useOptAddMultipleIngredients from './optimistic/useOptAddMultipleIngredients'

export type UseUserIngredientsReturnType = {
    userIngredients: Ingredient[];
    isLoading: boolean;
    addUserIngredient: (ingredient: Ingredient) => void;
    addCommonIngredients: () => void;
    addMultipleIngredients: (ingredients: Ingredient[]) => void;
    deleteUserIngredient: (ingredient: Ingredient) => void;
    deleteAllUserIngredients: () => void;
}

const useUserIngredients = (): UseUserIngredientsReturnType => {
    const { isSignedIn } = useAuth()
    const queryClient = useQueryClient()

    const addUserIngredientMutation = useOptAddUserIngredient()
    const deleteUserIngredientMutation = useOptDeleteUserIngredient()
    const deleteAllUserIngredientsMutation = useOptDeleteAllUserIngredients()
    const addMultipleIngredientsMutation = useOptAddMultipleIngredients()

    const { data: userIngredients, isLoading } = useQuery({
        queryKey: ['userIngredients'],
        queryFn: () => getUserIngredients(),
        enabled: !!isSignedIn,
        throwOnError: true
    })

    const addUserIngredient = (ingredient: Ingredient) => {
        console.log('adding ingredient', ingredient);
        addUserIngredientMutation.mutate(ingredient)
    }

    const addMultipleIngredients = (ingredients: Ingredient[]) => {
        const missingIngredients = filterExistingIngredients(ingredients)
        if (missingIngredients.length === 0) return
        addMultipleIngredientsMutation.mutate(ingredients)
    }

    const addCommonIngredients = () => {
        console.log('adding common ingredients');

        //Getting the common ingredients from the cache
        const commonIngredients = queryClient.getQueryData(['common-ingredient-suggestions']) as Ingredient[]

        const missingIngredients = filterExistingIngredients(commonIngredients)
        
        addMultipleIngredients(missingIngredients)
    }
    
    const filterExistingIngredients = (ingredients: Ingredient[]) => {
        //using a set for faster lookup. O(n) instead of O(n^2)
        const userIngredientIds = new Set(userIngredients?.map((ingredient: Ingredient) => ingredient.id));
        return ingredients.filter((ingredient: Ingredient) => !userIngredientIds.has(ingredient.id));
    }

    const deleteUserIngredient = (ingredient: Ingredient) => {
        console.log('removing ingredient', ingredient);
        deleteUserIngredientMutation.mutate(ingredient)
    }

    const deleteAllUserIngredients = () => {
        console.log('removing all ingredients');
        deleteAllUserIngredientsMutation.mutate(null)
    }

    return {
        userIngredients: userIngredients || [],
        isLoading,
        addUserIngredient,
        addCommonIngredients,
        addMultipleIngredients,
        deleteUserIngredient,
        deleteAllUserIngredients
    }
}

export default useUserIngredients