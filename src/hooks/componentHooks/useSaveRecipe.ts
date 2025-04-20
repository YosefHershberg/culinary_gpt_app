import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "@tanstack/react-router";

import { saveUserRecipeAPI } from "@/services/recipe.service";
import type { RecipeWithImage } from "@/lib/types";

type SaveRecipeResponse = {
    isLoading: boolean,
    error: Error | null,
    saveRecipe: (recipe: RecipeWithImage) => void
}

const useSaveRecipe = (): SaveRecipeResponse => {
    const navigate = useNavigate()

    const { mutate, isPending, error } = useMutation({
        mutationFn: saveUserRecipeAPI,
        onSuccess: () => {
            toast({
                title: 'Recipe added!',
                description: 'Your recipe has been successfully added to My Recipes.'
            })
            navigate({ to: '/my-recipes' })
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-ignore
                description: error.response?.data?.message || 'An error occurred while adding your recipe to My Recipes.'
            })
        }
    })

    return {
        isLoading: isPending,
        error,
        saveRecipe: mutate
    }
}

export default useSaveRecipe;