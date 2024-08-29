import { useAuth } from '@/context/auth-provider'
import { getUserIngredients } from '@/services/ingredient.service'
import { useQuery } from '@tanstack/react-query'
import useOptAddUserIngredient from './optimistic/useOptAddUserIngredient'
import useOptDeleteUserIngredient from './optimistic/useOptDeleteUserIngredient'
import { Ingredient } from '@/lib/types'

const useUserIngredients = () => {
    const { isSignedIn } = useAuth()

    const addUserIngredientMutation = useOptAddUserIngredient()
    const deleteUserIngredientMutation = useOptDeleteUserIngredient()

    const { data: userIngredients, isLoading: isLoadingUserIngrdts } = useQuery({
        queryKey: ['userIngredients'],
        queryFn: () => getUserIngredients(),
        enabled: !!isSignedIn,
        throwOnError: true
    })

    const addUserIngredient = (ingredient: Ingredient) => {
        console.log('adding ingredient', ingredient);
        if (userIngredients) {
            addUserIngredientMutation.mutate(ingredient)
        }
    }

    const deleteUserIngredient = (ingredient: Ingredient) => {
        console.log('removing ingredient', ingredient);
        if (userIngredients) {
            deleteUserIngredientMutation.mutate(ingredient)
        }
    }

    return {
        userIngredients,
        isLoadingUserIngrdts,
        addUserIngredient,
        deleteUserIngredient
    }
}

export default useUserIngredients