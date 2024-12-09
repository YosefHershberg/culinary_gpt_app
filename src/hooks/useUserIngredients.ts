import { useAuth } from '@/context/auth-context'
import { getUserIngredients } from '@/services/ingredient.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Ingredient } from '@/lib/types'

import useOptAddUserIngredient from './optimistic/useOptAddUserIngredient'
import useOptDeleteUserIngredient from './optimistic/useOptDeleteUserIngredient'
import useOptDeleteAllUserIngredients from './optimistic/useOptDeleteAllUserIngredients'
import useOptAddMultipleIngredients from './optimistic/useOptAddMultipleIngredients'

type UseUserIngredientsReturnType = {
    userIngredients: Ingredient[] | undefined;
    isLoadingUserIngredients: boolean;
    addUserIngredient: (ingredient: Ingredient) => void;
    addCommonIngredients: () => void;
    deleteUserIngredient: (ingredient: Ingredient) => void;
    deleteAllUserIngredients: () => void;
}

const useUserIngredients = (): UseUserIngredientsReturnType => {
    const { isSignedIn } = useAuth()
    const queryClient = useQueryClient()

    const addUserIngredientMutation = useOptAddUserIngredient()
    const deleteUserIngredientMutation = useOptDeleteUserIngredient()
    const deleteAllUserIngredientsMutation = useOptDeleteAllUserIngredients()
    const addMultipleIngredients = useOptAddMultipleIngredients()

    const { data: userIngredients, isLoading: isLoadingUserIngredients } = useQuery({
        queryKey: ['userIngredients'],
        queryFn: () => getUserIngredients(),
        enabled: !!isSignedIn,
        throwOnError: true
    })

    const addUserIngredient = (ingredient: Ingredient) => {
        console.log('adding ingredient', ingredient);
        addUserIngredientMutation.mutate(ingredient)
    }

    const addCommonIngredients = () => {
        console.log('adding common ingredients');

        //Getting the common ingredients from the cache
        const commonIngredients = queryClient.getQueryData(['common-ingredient-suggestions']) as Ingredient[]

        //using a set for faster lookup. O(n) instead of O(n^2)
        const userIngredientIds = new Set(userIngredients?.map((ingredient: Ingredient) => ingredient.id));
        const missingIngredients = commonIngredients.filter(
            (ingredient: Ingredient) => !userIngredientIds.has(ingredient.id)
        );
        
        addMultipleIngredients.mutate(missingIngredients)
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
        userIngredients,
        isLoadingUserIngredients,
        addUserIngredient,
        addCommonIngredients,
        deleteUserIngredient,
        deleteAllUserIngredients
    }
}

export default useUserIngredients