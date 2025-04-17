import useHttpClient from "../useHttpClient";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "@tanstack/react-router";

import type { RecipeWithImage } from "@/lib/types";

type SaveRecipeResponse = {
    responseStatus: number | null,
    isLoading: boolean,
    error: any,
    handleSaveRecipe: () => void
}

const useSaveRecipe = (recipe: RecipeWithImage): SaveRecipeResponse => {
    const navigate = useNavigate()

    const { responseStatus, isLoading, error, triggerHttpReq } = useHttpClient({
        endpoint: '/user/recipes',
        method: 'POST',
        body: recipe,
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
        responseStatus,
        isLoading,
        error,
        handleSaveRecipe: () => triggerHttpReq()
    }
}

export default useSaveRecipe;