import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUserIngredient } from "@/services/ingredient.service"
import { Ingredient } from "@/lib/types"

import { toast } from "@/components/ui/use-toast"

const useOptDeleteUserIngredient = () => {
    const queryClient = useQueryClient()

    const deleteUserIngredientMutation = useMutation({
        mutationFn: (ingredient: Ingredient) => deleteUserIngredient(ingredient),

        onMutate: async (ingredient: any) => {
            await queryClient.cancelQueries({ queryKey: ['userIngredients'] })
            const previousIngredients = queryClient.getQueryData(['userIngredients']) as Ingredient[]

            queryClient.setQueryData(['userIngredients'], previousIngredients.filter((i: Ingredient) => i.name !== ingredient.name))
            return { previousIngredients }
        },

        onError: (error: Error, _ingredient: Ingredient, context: any) => {
            queryClient.setQueryData(['userIngredients'], context?.previousIngredients)
            toast({
                variant: "destructive",
                title: "Oops! Something went wrong!",
                //@ts-expect-error
                description: error.response?.data?.message || "An error occurred while removing ingredient.",
            })
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['userIngredients'] })
    })

    return deleteUserIngredientMutation
}

export default useOptDeleteUserIngredient