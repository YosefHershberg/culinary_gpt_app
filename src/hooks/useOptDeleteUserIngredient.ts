import { toast } from "@/components/ui/use-toast"
import { deleteUserIngredient } from "@/lib/api"
import { Ingredient } from "@/lib/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useOptdeleteUserIngredient = () => {
    const queryClient = useQueryClient()

    const deleteUserIngredientMutation = useMutation({
        mutationFn: (ingredient: Ingredient) => deleteUserIngredient(ingredient),

        onMutate: async (ingredient: any) => {
            await queryClient.cancelQueries({ queryKey: ['userIngredients'] })
            const previousIngredients = queryClient.getQueryData(['userIngredients'])

            //@ts-expect-error
            queryClient.setQueryData(['userIngredients'], previousIngredients.filter((i: Ingredient) => i.name !== ingredient.name))
            return { previousIngredients }
        },

        onError: (error: Error, _ingredient: Ingredient, context: any) => {
            queryClient.setQueryData(['userIngredients'], context?.previousIngredients)
            console.log(error);
            toast({
                variant: "destructive",
                title: "Oops! Something went wrong!",
                //@ts-expect-error
                description: error.response?.data?.message || "An error occurred while removing ingredient.",
            })
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['userIngredients']})
    })

    return deleteUserIngredientMutation
}

export default useOptdeleteUserIngredient