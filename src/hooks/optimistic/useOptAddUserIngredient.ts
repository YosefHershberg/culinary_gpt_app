import { useQueryClient, useMutation } from "@tanstack/react-query"
import { Ingredient } from "@/lib/types"
import { addUserIngredient } from "@/services/ingredient.service"

import { toast } from "@/components/ui/use-toast"

const useOptAddUserIngredient = () => {
    const queryClient = useQueryClient()

    const addUserIngredientMutation = useMutation({
        mutationFn: (ingredient: Ingredient) => addUserIngredient(ingredient),

        onMutate: async (ingredient: Ingredient) => {
            await queryClient.cancelQueries({ queryKey: ['userIngredients']})
            const previousIngredients = queryClient.getQueryData(['userIngredients']) as Ingredient[]

            queryClient.setQueryData(['userIngredients'], [...previousIngredients, ingredient])
            return { previousIngredients }
        },

        onError: (error: Error, _ingredient: Ingredient, context: any) => {
            queryClient.setQueryData(['userIngredients'], context?.previousIngredients)
            toast({
                variant: "destructive",
                title: "Oops! Something went wrong!",
                //@ts-expect-error
                description: error.response?.data?.message || "An error occurred while adding ingredient.",
            })
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ['userIngredients']})
    })

    return addUserIngredientMutation
}

export default useOptAddUserIngredient