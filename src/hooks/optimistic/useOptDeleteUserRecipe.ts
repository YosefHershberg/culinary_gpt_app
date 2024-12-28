import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deleteUserRecipe } from "@/services/recipe.service"
import { toast } from "@/components/ui/use-toast"
import { RecipeWithImage } from "@/lib/types"

const useOptDeleteUserRecipe = () => {
    const queryClient = useQueryClient()

    const deleteUserRecipeMutation = useMutation({
        mutationFn: (recipe: RecipeWithImage) => deleteUserRecipe(recipe?.id as string),

        onMutate: async (recipe: RecipeWithImage) => {
            console.log('1');

            await queryClient.cancelQueries({ queryKey: ['userRecipes'] })
            const previousCachedData = queryClient.getQueryData<RecipeWithImage[]>(['userRecipes']) as RecipeWithImage[]

            console.log('2', previousCachedData);
            try {

                queryClient.setQueryData(['userRecipes'], (oldData: RecipeWithImage[] | undefined) => 
                    oldData ? oldData.filter((r: RecipeWithImage) => r.id !== recipe.id) : [])
            } catch (error) {
                console.log('error', error);

            }

            console.log('3');
            return { previousCachedData }
        },

        onSuccess: () => {
            toast({
                variant: "default",
                title: "Recipe deleted successfully",
            })

        },

        onError: (error: Error, _recipe: RecipeWithImage, context: any) => {
            queryClient.setQueryData(['userRecipes'], context?.previousCachedData)
            toast({
                variant: "destructive",
                title: "Oops! Something went wrong!",
                //@ts-expect-error
                description: error.response?.data?.message || "An error occurred while deleting recipe.",
            })
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ['userRecipes'] })
    })

    return deleteUserRecipeMutation
}

export default useOptDeleteUserRecipe