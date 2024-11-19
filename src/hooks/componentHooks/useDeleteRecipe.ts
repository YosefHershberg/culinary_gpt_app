import { RecipeWithImage } from "@/lib/types"
import { useState } from "react"
import useOptDeleteUserRecipe from "../optimistic/useOptDeleteUserRecipe"

type UseDeleteRecipeResponse = {
    handleDelete: () => void,
    handleOpenModal: (recipe: RecipeWithImage) => void,
    handleCloseModal: () => void,
    isOpen: boolean
}

const useDeleteRecipe = (): UseDeleteRecipeResponse => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [recipeToDelete, setRecipeToDelete] = useState<RecipeWithImage | null>(null)

    const deleteUserRecipeMutation = useOptDeleteUserRecipe()

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