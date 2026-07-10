import { useQuery } from '@tanstack/react-query'

import { z } from 'zod'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { getUserRecipeAPI } from '@/services/recipe.service'
import SuspenseTrigger from '@/components/SuspenseTrigger'
import RecipePage from '@/pages/RecipePage'

import type { RecipeWithImage } from '@/lib/types'

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

    // The create flows pass the full RecipeWithImage through history state
    const locationState = location.state as unknown as RecipeWithImage | undefined

    const { data: recipe, isLoading } = useQuery({
        queryKey: ['userRecipe'],
        queryFn: () => getUserRecipeAPI(recipeId),

        // Disable the query when the recipe is already in the location state
        enabled: !locationState?.recipe,
        throwOnError: true,
    })

    if (locationState?.recipe) {
        return (
            <RecipePage
                createdRecipe={locationState}
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
