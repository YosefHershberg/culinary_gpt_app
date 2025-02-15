import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHttpClient from "../useHttpClient";
import { RecipeWithImage } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";

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
        body: recipe
    })

    useEffect(() => {
        if (responseStatus === 200) {
            navigate('/my-recipes')
        }

        if (error) {
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-ignore
                description: error.response?.data?.message || 'An error occurred while adding your recipe to My Recipes.'
            })
        }
    }, [responseStatus, error])

    const handleSaveRecipe = () => {
        triggerHttpReq()
    }


    return {
        responseStatus,
        isLoading,
        error,
        handleSaveRecipe
    }
}

export default useSaveRecipe;