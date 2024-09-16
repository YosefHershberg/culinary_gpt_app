import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSuspenseQuery } from '@tanstack/react-query'

import useOptDeleteUserRecipe from './optimistic/useOptDeleteUserRecipe'
import { getUserRecipes } from '@/services/recipe.service'
import { Recipe } from '@/lib/types'

const useMyRecipes = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null)

    const deleteUserRecipeMutation = useOptDeleteUserRecipe()
    const navigate = useNavigate()

    const { data: recipes } = useSuspenseQuery({
        queryKey: ['userRecipes'],
        queryFn: getUserRecipes,
    })

    const handleClick = (recipe: Recipe) => {
        navigate(`/user-recipe/${recipe.id}`, { state: recipe })
    }

    const handleDelete = () => {
        setIsOpen(false)
        if (recipeToDelete) {
            deleteUserRecipeMutation.mutate(recipeToDelete)
        }
    }

    const handleOpenModal = (recipe: Recipe) => {
        setIsOpen(true)
        setRecipeToDelete(recipe)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    return {
        recipes,
        handleClick,
        handleDelete,
        isOpen,
        handleOpenModal,
        handleCloseModal
    }
}

export default useMyRecipes