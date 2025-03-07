import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useSaveRecipe from '@/hooks/componentHooks/useSaveRecipe';
import { RecipeWithImage } from '@/lib/types';
import RecipePage from '@/pages/RecipePage';
import { createFileRoute, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/recipe')({
  component: RouteComponent,
})

function RouteComponent() {
  const recipe = useLocation().state as unknown as RecipeWithImage
    const { isLoading, handleSaveRecipe } = useSaveRecipe(recipe)

    return (
        <RecipePage
            createdRecipe={recipe}
            addToRecipesBtn={
                <Button
                    disabled={!recipe?.image_url}
                    onClick={handleSaveRecipe}
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
