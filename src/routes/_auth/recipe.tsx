import { createFileRoute, redirect, useLocation } from '@tanstack/react-router'
import useSaveRecipe from '@/hooks/componentHooks/useSaveRecipe';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import RecipePage from '@/pages/RecipePage';

import type { RecipeWithImage } from '@/lib/types';

export const Route = createFileRoute('/_auth/recipe')({
    // NOTE: this should no be the beforeLoad because it interrupts the preloading of the route
    loader: ({ location }) => {
        const state = location.state as { recipe?: RecipeWithImage };
        if (!state.recipe) {
            throw redirect({ to: '/' });
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const recipe = useLocation().state as unknown as RecipeWithImage
    const { isLoading, saveRecipe } = useSaveRecipe()

    return (
        <RecipePage
            createdRecipe={recipe}
            addToRecipesBtn={
                <Button
                    disabled={!recipe?.image_url}
                    onClick={() => saveRecipe(recipe)}
                    variant='secondary'
                    className='min-w-[8rem] h-12 rounded-full px-5 hover:scale-105 transition duration-300 ease-in-out disabled:cursor-not-allowed'
                >
                    {isLoading ?
                        <LoadingSpinner className='size-5' />
                        : 'Add to My Recipes'
                    }
                </Button>
            }
        />
    );
}
