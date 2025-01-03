import { useQueryClient, useMutation, InfiniteData } from "@tanstack/react-query"
import { deleteUserRecipe } from "@/services/recipe.service"
import { toast } from "@/components/ui/use-toast"
import { RecipeWithImage } from "@/lib/types"

const useOptDeleteUserRecipe = () => {
    const queryClient = useQueryClient()

    const deleteUserRecipeMutation = useMutation({
        mutationFn: (recipe: RecipeWithImage) => deleteUserRecipe(recipe?.id as string),

        onMutate: async (recipe: RecipeWithImage) => {

            await queryClient.cancelQueries({ queryKey: ['userRecipes'] })
            const previousCachedData = queryClient.getQueryData<RecipeWithImage[]>(['userRecipes']) as RecipeWithImage[]

            try {
                queryClient.setQueryData(['userRecipes'], (oldData: InfiniteData<RecipeWithImage[]> | undefined) => {
                    if (oldData && Array.isArray(oldData.pages)) {
                        // Filter out the recipe with the given id from each page
                        const updatedPages = oldData.pages.map(page =>
                            page.filter(r => r.id !== recipe.id)
                        );

                        // Return the updated structure
                        return {
                            pages: updatedPages,
                            pageParams: oldData.pageParams
                        };
                    } else {
                        // If oldData is not an array or doesn't have pages, log an error and return the original data
                        console.error('oldData is not structured as expected:', oldData);
                        return oldData;
                    }
                });
            } catch (error) {
                console.error('Error updating query data:', error);
            }

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