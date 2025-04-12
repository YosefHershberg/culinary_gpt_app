import SuspenseTrigger from '@/components/SuspenseTrigger'
import RecipePage from '@/pages/RecipePage'
import { getUserRecipeAPI } from '@/services/recipe.service'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_auth/user-recipe/$recipeId')({
  params: {
    parse: (params) => ({
      recipeId: z.string().parse(String(params.recipeId)),
    }),
    stringify: ({ recipeId }) => ({ recipeId: `${recipeId}` }),
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { recipeId } = Route.useParams()
    const location = useLocation()

    const { data: recipe, isLoading } = useQuery({
        queryKey: ['userRecipe'],
        queryFn: () => getUserRecipeAPI(recipeId),

        // Disable the query when the recipe is already in the location state
        //@ts-expect-error
        enabled: !location.state.recipe,
        throwOnError: true,
    })

    //@ts-expect-error
    if (location.state.recipe) {
        return (
            <RecipePage
                createdRecipe={location.state as any}
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
