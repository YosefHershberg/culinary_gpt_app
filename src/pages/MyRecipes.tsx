import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import DeleteRecipeModal from "@/components/modals/DeleteRecipeModal";
import SortOptionsDropdown from "@/components/my-recipes/SortOptionsDropdown";
import FilterOptionsDropdown from "@/components/my-recipes/FilterOptionsDropdown";
import Recipe from "@/components/my-recipes/Recipe";
import SearchRecipesBar from "@/components/my-recipes/SearchRecipesBar";

import useMyRecipes from "@/hooks/componentHooks/useMyRecipes";
import useDeleteRecipe from "@/hooks/componentHooks/useDeleteRecipe";
import useFilterRecipes from "@/hooks/componentHooks/useFilterRecipes";
import useSortRecipes from "@/hooks/componentHooks/useSortRecipes";
import useSearchRecipes from "@/hooks/componentHooks/useSearchRecipes";

import { RecipeWithImage as RecipeType } from "@/lib/types";

const MyRecipes: React.FC = () => {
  const navigate = useNavigate();
  const { recipes, handleClick } = useMyRecipes();
  const { isOpen, handleDelete, handleOpenModal, handleCloseModal } = useDeleteRecipe();
  const { filteredRecipes, handleFilterChange, currentFilter } = useFilterRecipes(recipes);
  const { sortedRecipes, handleSortChange, currentSort } = useSortRecipes(filteredRecipes);
  const { isSearchBarFocused, setIsSearchBarFocused, handleValueChange, searchValue, foundRecipes, isDebouncing } = useSearchRecipes(recipes);

  const noRecipes = recipes.length === 0;
  const noSearchResults = foundRecipes.length === 0 && searchValue !== '' && !isDebouncing;
  const noSortedRecipes = sortedRecipes.length === 0;
  const recipesToDisplay = searchValue === '' ? sortedRecipes : foundRecipes;

  return (
    <main className="w-screen flex-1 flex flex-col items-center bg-amber-100 dark:bg-zinc-700 px-4">
      <div className="my-6 flex flex-col items-center w-full max-w-[40rem]">
        <h1 className="text-2xl font-semibold text-center mb-4">My Recipes</h1>
        <div className="relative h-10 w-full flex gap-3">
          {!isSearchBarFocused && (
            <>
              <FilterOptionsDropdown
                handleFilterChange={handleFilterChange}
                currentFilter={currentFilter}
              />
              <SortOptionsDropdown
                handleSortChange={handleSortChange}
                currentSort={currentSort}
              />
            </>
          )}
          <SearchRecipesBar
            isDebouncing={isDebouncing}
            searchValue={searchValue}
            handleValueChange={handleValueChange}
            setIsSearchBarFocused={setIsSearchBarFocused}
          />
        </div>

        {/* Show message if there are no recipes */}
        {noRecipes && (
          <div className="flex flex-col items-center">
            <p className="text-center text-xl mt-10">You have no recipes yet!</p>
            <Button
              variant="secondary"
              onClick={() => navigate('/create-new-recipe')}
              className="mt-6 w-fit"
            >
              Create a new recipe
            </Button>
          </div>
        )}

        {/* Show message if no search results are found */}
        {noSearchResults && (
          <div className="flex flex-col items-center">
            <p className="text-center text-xl mt-10">No recipes found!</p>
          </div>
        )}

        {/* Display recipes based on the search state */}
        {!noRecipes && !noSearchResults && recipesToDisplay.map((recipe: RecipeType) => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
            handleClick={handleClick}
            handleOpenModal={handleOpenModal}
          />
        ))}

        {/* Show message if no sorted recipes are found */}
        {searchValue === '' && noSortedRecipes && (
          <div className="flex flex-col items-center">
            <p className="text-center text-xl mt-10">No recipes found!</p>
          </div>
        )}
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
