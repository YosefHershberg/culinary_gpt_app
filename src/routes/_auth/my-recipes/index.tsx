import DeleteRecipeModal from '@/components/modals/DeleteRecipeModal'
import Recipe from '@/components/my-recipes/Recipe'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import useDeleteRecipe from '@/hooks/componentHooks/useDeleteRecipe'
import useMyRecipes from '@/hooks/componentHooks/useMyRecipes'
import { RecipeWithImage } from '@/lib/types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/my-recipes/')({
  loaderDeps: ({ search: recipesView }) => (recipesView),
  component: RouteComponent,
})

function RouteComponent() {
  const { recipesView } = Route.useLoaderDeps()
  const { isOpen, handleDelete, handleOpenModal, handleCloseModal } = useDeleteRecipe();
  const { query, sentinelRef } = useMyRecipes({
    searchQuery: recipesView?.q ?? '',
    currentFilter: recipesView?.filterBy ?? 'all',
    currentSort: recipesView?.sortBy ?? 'newest',
  })

  return (
    <section className="w-full max-w-[40rem]">
      {query.recipes.map((recipe: RecipeWithImage) => (
        <Recipe
          key={recipe.id}
          recipe={recipe}
          handleOpenModal={handleOpenModal}
        />
      ))}

      {(query.isLoading || query.isFetchingNextPage) && (
        <div className="flex justify-center items-center w-full h-[10rem]" aria-live="polite">
          <LoadingSpinner />
        </div>
      )}

      {query.recipes.length === 0 && <NoRecipesMessage />}

      <div ref={sentinelRef} />
      <DeleteRecipeModal
        isOpen={isOpen}
        close={handleCloseModal}
        handleClick={handleDelete}
      />
    </section>
  )
}


const NoRecipesMessage: React.FC = () => (
  <div className="flex flex-col gap-4 items-center justify-center w-full h-[10rem]">
    <p className="text-lg text-center">No recipes found.</p>
  </div>
);
