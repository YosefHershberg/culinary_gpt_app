import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deleteUserRecipe } from "@/services/userRecipe.service"
import { Recipe } from "@/lib/types"

import { toast } from "@/components/ui/use-toast"

const useOptDeleteUserRecipe = () => {
    const queryClient = useQueryClient()

    const deleteUserRecipeMutation = useMutation({
        mutationFn: (recipe: Recipe) => deleteUserRecipe(recipe?.id as string),

        onMutate: async (recipe: Recipe) => {
            await queryClient.cancelQueries({ queryKey: ['userRecipes'] })
            const previousCachedData = queryClient.getQueryData<Recipe[]>(['userRecipes']) as Recipe[]

            queryClient.setQueryData(['userRecipes'], [...previousCachedData.filter((r: Recipe) => r.id !== recipe.id)])
            return { previousCachedData }
        },

        onSuccess: () => {
            toast({
                variant: "default",
                title: "Recipe deleted successfully",
            })

        },

        onError: (error: Error, _recipe: Recipe, context: any) => {
            queryClient.setQueryData(['userRecipes'], context?.previousCachedData)
            console.log(error);
            toast({
                variant: "destructive",
                title: "Oops! Something went wrong!",
                //@ts-expect-error
                description: error.response?.data?.message || "An error occurred while adding ingredient.",
            })
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ['userRecipes'] })
    })

    return deleteUserRecipeMutation
}

export default useOptDeleteUserRecipe