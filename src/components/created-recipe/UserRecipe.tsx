import { useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { getUserRecipe } from "@/services/recipe.service"
import RecipePage from "@/pages/RecipePage"
import SuspenseTrigger from "../SuspenseTrigger"

const UserRecipe: React.FC = () => {
    const { id } = useParams()
    const location = useLocation()

    const { data: recipe, isLoading } = useQuery({
        queryKey: ['userRecipe'],
        queryFn: () => getUserRecipe(id as string),

        // Disable the query when the recipe is already in the location state
        enabled: !location.state,
    })

    if (location.state) {
        return (
            <RecipePage
                createdRecipe={location.state}
            />
        )
    } else {
        if (isLoading) {
            <SuspenseTrigger />
        }
        if (recipe) {
            return (
                <RecipePage
                    createdRecipe={recipe}
                />
            )
        }
    }
}

export default UserRecipe