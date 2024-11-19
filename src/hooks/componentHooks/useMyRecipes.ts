import { useNavigate } from 'react-router-dom'
import { useSuspenseQuery } from '@tanstack/react-query'

import { getUserRecipes } from '@/services/recipe.service'
import { RecipeWithImage } from '@/lib/types'

const useMyRecipes = () => {
    const navigate = useNavigate()

    const { data: recipes } = useSuspenseQuery({
        queryKey: ['userRecipes'],
        queryFn: getUserRecipes,
    })

    const handleClick = (recipe: RecipeWithImage) => {
        navigate(`/user-recipe/${recipe.id}`, { state: recipe })
    }

    return {
        recipes,
        handleClick,
    }
}

export default useMyRecipes