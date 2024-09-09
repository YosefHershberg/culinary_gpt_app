import { useAuth } from '@/context/auth-context'
import { getUserIngredients } from '@/services/ingredient.service'
import { useQuery } from '@tanstack/react-query'
import useOptAddUserIngredient from './optimistic/useOptAddUserIngredient'
import useOptDeleteUserIngredient from './optimistic/useOptDeleteUserIngredient'
import { Ingredient } from '@/lib/types'
import useOptDeleteAllUserIngredients from './optimistic/useOptDeleteAllUserIngredients'

type UseUserIngredientsReturnType = {
    userIngredients: Ingredient[] | undefined;
    isLoadingUserIngrdts: boolean;
    addUserIngredient: (ingredient: Ingredient) => void;
    deleteUserIngredient: (ingredient: Ingredient) => void;
    deleteAllUserIngredients: () => void;
}

const useUserIngredients = (): UseUserIngredientsReturnType => {
    const { isSignedIn } = useAuth()

    const addUserIngredientMutation = useOptAddUserIngredient()
    const deleteUserIngredientMutation = useOptDeleteUserIngredient()
    const deleteAllUserIngredientsMutation = useOptDeleteAllUserIngredients()

    const { data: userIngredients, isLoading: isLoadingUserIngrdts } = useQuery({
        queryKey: ['userIngredients'],
        queryFn: () => getUserIngredients(),
        enabled: !!isSignedIn,
        throwOnError: true
    })

    const addUserIngredient = (ingredient: Ingredient) => {
        console.log('adding ingredient', ingredient);
        addUserIngredientMutation.mutate(ingredient)
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
        isLoadingUserIngrdts,
        addUserIngredient,
        deleteUserIngredient,
        deleteAllUserIngredients
    }
}

export default useUserIngredients