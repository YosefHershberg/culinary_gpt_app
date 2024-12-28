import DeleteRecipeModal from "@/components/modals/DeleteRecipeModal";
import Recipe from "@/components/my-recipes/Recipe";
import SearchRecipesBar from "@/components/my-recipes/SearchRecipesBar";

import useMyRecipes from "@/hooks/componentHooks/useMyRecipes";
import useDeleteRecipe from "@/hooks/componentHooks/useDeleteRecipe";

import { RecipeWithImage as RecipeType } from "@/lib/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FilterOptionsDropdown from "@/components/my-recipes/FilterOptionsDropdown";
import SortOptionsDropdown from "@/components/my-recipes/SortOptionsDropdown";

const MyRecipes: React.FC = () => {
  const { searchData, filterData, sortData, sentinelRef, query } = useMyRecipes();
  const { isOpen, handleDelete, handleOpenModal, handleCloseModal } = useDeleteRecipe();

  const noRecipes = query.recipes.length === 0 && !query.isLoading && searchData.debouncedValue === '';
  const noSearchResults = searchData.searchValue !== '' && !searchData.isDebouncing && query.recipes.length === 0 && !query.isLoading;
  const recipesToDisplay = query.recipes;

  return (
    <main className="w-screen flex-1 flex flex-col items-center bg-amber-100 dark:bg-zinc-700 px-4">
      <div className="my-6 flex flex-col items-center w-full max-w-[40rem]">
        <h1 className="text-2xl font-semibold text-center mb-4">My Recipes</h1>
        <div className="relative h-10 w-full flex gap-3">
          <SearchRecipesBar
            isDebouncing={searchData.isDebouncing}
            searchValue={searchData.searchValue}
            handleValueChange={searchData.handleValueChange}
            setIsSearchBarFocused={searchData.setIsSearchBarFocused}
          />
          {!searchData.isSearchBarFocused && (
            <>
              <FilterOptionsDropdown
                handleFilterChange={filterData.handleFilterChange}
                currentFilter={filterData.currentFilter}
              />
              <SortOptionsDropdown
                handleSortChange={sortData.handleSortChange}
                currentSort={sortData.currentSort}
              />
            </>
          )}
        </div>

        <div className="w-full max-w-[40rem]">
          {recipesToDisplay.map((recipe: RecipeType) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              handleOpenModal={handleOpenModal}
            />
          ))}

          {query.isLoading && (
            <div className="flex justify-center items-center w-full h-[10rem]">
              <LoadingSpinner />
            </div>
          )}

          {query.isFetchingNextPage && (
            <div className="flex justify-center items-center w-full h-[10rem]">
              <LoadingSpinner />
            </div>
          )}

          {noRecipes && (
            <div className="flex flex-col gap-4 items-center justify-center w-full h-[10rem]">
              <p className="text-lg text-center">You haven't added any recipes yet.</p>
              <Button
                variant="secondary"
                asChild
              >
                <Link to="/create-new-recipe">Add a Recipe</Link>
              </Button>
            </div>
          )}

          {noSearchResults && (
            <div className="flex flex-col gap-4 items-center justify-center w-full h-[10rem]">
              <p className="text-lg text-center">No recipes found.</p>
            </div>
          )}

          <div ref={sentinelRef} />
        </div>

      </div>

      <DeleteRecipeModal
        isOpen={isOpen}
        close={handleCloseModal}
        handleClick={handleDelete}
      />
    </main>
  );
};

export default MyRecipes
