import { useState } from "react"
import useOptimisticMutation from "@/hooks/useOptimisticMutation"

import { RecipeWithImage } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"
import { deleteUserRecipeAPI } from "@/services/recipe.service"
import { InfiniteData } from "@tanstack/react-query"
import { RECIPES_QUERY_KEY } from "@/lib/queryKeys"

type UseDeleteRecipeResponse = {
    handleDelete: () => void,
    handleOpenModal: (recipe: RecipeWithImage) => void,
    handleCloseModal: () => void,
    isOpen: boolean
}

const useDeleteRecipe = (): UseDeleteRecipeResponse => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [recipeToDelete, setRecipeToDelete] = useState<RecipeWithImage | null>(null)

    const deleteUserRecipeMutation = useOptimisticMutation({
        queryKey: RECIPES_QUERY_KEY,
        mutation: (recipe: RecipeWithImage) => {
            return deleteUserRecipeAPI(recipe?.id as string);
        },
        optimisticUpdate: (recipe: RecipeWithImage, oldData: InfiniteData<RecipeWithImage[]>) => {
            if (oldData && Array.isArray(oldData.pages)) {
                const updatedPages = oldData.pages.map(page =>
                    page.filter(r => r.id !== recipe.id)
                );
                
                return {
                    pages: updatedPages,
                    pageParams: oldData.pageParams
                };
            } else {
                console.error('oldData is not structured as expected:', oldData);
                return oldData;
            }
        },
        errorMessage: "An error occurred while deleting recipe.",
        onSuccess: () => {
            toast({
                variant: "default",
                title: "Recipe deleted successfully",
            });
        }
    });

    const handleDelete = () => {                
        setIsOpen(false)
        if (recipeToDelete) {
            deleteUserRecipeMutation.mutate(recipeToDelete)
        }
    }

    const handleOpenModal = (recipe: RecipeWithImage) => {
        setIsOpen(true)
        setRecipeToDelete(recipe)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    return {
        handleDelete,
        handleOpenModal,
        handleCloseModal,
        isOpen
    }
}

export default useDeleteRecipe;