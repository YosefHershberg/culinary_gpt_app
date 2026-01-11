import { createFileRoute, Link } from '@tanstack/react-router';

import DeleteRecipeModal from '@/components/modals/DeleteRecipeModal';
import Recipe from '@/components/my-recipes/Recipe';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

import useDeleteRecipe from '@/hooks/componentHooks/useDeleteRecipe';
import useMyRecipesQuery, { LIMIT } from '@/hooks/componentHooks/useMyRecipesQuery';

import { getUserRecipesAPI } from '@/services/recipe.service';
import { FilterRecipesOptions, SortRecipesOptions } from '@/lib/enums';
import type { RecipeWithImage } from '@/lib/types';

export const Route = createFileRoute('/_auth/my-recipes/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['userRecipes'],
      queryFn: () => getUserRecipesAPI({
        page: 1,
        limit: LIMIT,
        query: '',
        filter: FilterRecipesOptions.All,
        sort: SortRecipesOptions.Newest,
      }),
      initialPageParam: 1,
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { recipesView } = Route.useSearch();
  const { isOpen, handleDelete, handleOpenModal, handleCloseModal } = useDeleteRecipe();
  const { query, sentinelRef } = useMyRecipesQuery({
    searchQuery: recipesView?.q ?? '',
    currentFilter: recipesView?.filterBy ?? FilterRecipesOptions.All,
    currentSort: recipesView?.sortBy ?? SortRecipesOptions.Newest,
  });

  const isLoading = query.isLoading || query.isFetchingNextPage

  return (
    <section className="w-full max-w-[40rem]">
      {query.recipes.map((recipe: RecipeWithImage) => (
        <Recipe key={recipe.id} recipe={recipe} handleOpenModal={handleOpenModal} />
      ))}

      {isLoading && (
        <div className="flex justify-center items-center w-full h-[10rem]" role="status" aria-label="Loading">
          <LoadingSpinner />
        </div>
      )}

      {query.recipes.length === 0 && !isLoading && (
        <NoResultsMessage isCocktailFilter={recipesView?.filterBy === 'cocktails'} />
      )}

      <div ref={sentinelRef} />
      <DeleteRecipeModal isOpen={isOpen} close={handleCloseModal} handleClick={handleDelete} />
    </section>
  );
}

const NoResultsMessage = ({ isCocktailFilter }: { isCocktailFilter: boolean }) => (
  <div className="flex flex-col gap-4 items-center justify-center w-full h-[10rem]">
    <p className="text-lg">
      {isCocktailFilter ? 'No cocktails found' : 'No recipes found'}
    </p>
    <Link to={isCocktailFilter ? '/create-cocktail' : '/create-recipe'}>
      <Button className={`${isCocktailFilter ? 'bg-emerald-400 hover:bg-emerald-400' : 'bg-orange hover:bg-orange'}  transition-all duration-200 hover:scale-105 text-primary`}>
        {isCocktailFilter ? 'Create a cocktail' : 'Create a recipe'}
      </Button>
    </Link>
  </div>
);