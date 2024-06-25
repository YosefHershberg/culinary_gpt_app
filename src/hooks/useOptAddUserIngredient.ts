import { toast } from "@/components/ui/use-toast"
import { addUserIngredient } from "@/lib/api"
import { Ingredient } from "@/lib/types"
import { useQueryClient, useMutation } from "@tanstack/react-query"

const useOptAddUserIngredient = () => {
    const queryClient = useQueryClient()

    const addUserIngredientMutation = useMutation({
        mutationFn: (ingredient: Ingredient) => addUserIngredient(ingredient),

        onMutate: async (ingredient: Ingredient) => {
            await queryClient.cancelQueries({ queryKey: ['userIngredients']})
            const previousIngredients = queryClient.getQueryData(['userIngredients'])

            //@ts-expect-error
            queryClient.setQueryData(['userIngredients'], [...previousIngredients, ingredient])
            return { previousIngredients }
        },

        retry: 2,

        onError: (error: Error, _ingredient: Ingredient, context: any) => {
            queryClient.setQueryData(['userIngredients'], context?.previousIngredients)
            console.log(error);
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