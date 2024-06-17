import { useQuery } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"
import { getUserRecipe } from "@/lib/api"
import RecipePage from "@/pages/RecipePage"
import SuspenseTrigger from "./SuspenseTrigger"

const UserRecipe = () => {
    const { id } = useParams()
    const location = useLocation()

    const { data: recipe, isLoading } = useQuery({
        queryKey: ['userRecipe'],
        queryFn: () => getUserRecipe(id as string),
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