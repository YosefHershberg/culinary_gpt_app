import DeleteRecipeModal from "@/components/modals/DeleteRecipeModal";
import Recipe from "@/components/my-recipes/Recipe";
import SearchRecipesBar from "@/components/my-recipes/SearchRecipesBar";

import useMyRecipes from "@/hooks/componentHooks/useMyRecipes";
import useDeleteRecipe from "@/hooks/componentHooks/useDeleteRecipe";

import { RecipeWithImage as RecipeType } from "@/lib/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MyRecipes: React.FC = () => {
  const { search, sentinelRef, ...myRecipesData } = useMyRecipes();
  const { isOpen, handleDelete, handleOpenModal, handleCloseModal } = useDeleteRecipe();
  
  const noRecipes = myRecipesData.recipes.length === 0 && !myRecipesData.isLoading && search.debouncedValue === '';
  const noSearchResults = search.searchValue !== '' && !search.isDebouncing && myRecipesData.recipes.length === 0 && !myRecipesData.isLoading;
  const recipesToDisplay = myRecipesData.recipes;

  return (
    <main className="w-screen flex-1 flex flex-col items-center bg-amber-100 dark:bg-zinc-700 px-4">
      <div className="my-6 flex flex-col items-center w-full max-w-[40rem]">
        <h1 className="text-2xl font-semibold text-center mb-4">My Recipes</h1>
        <div className="relative h-10 w-full flex gap-3">
          <SearchRecipesBar
            isDebouncing={search.isDebouncing}
            searchValue={search.searchValue}
            handleValueChange={search.handleValueChange}
            setIsSearchBarFocused={search.setIsSearchBarFocused}
          />
        </div>

        <div className="w-full max-w-[40rem]">
          {recipesToDisplay.map((recipe: RecipeType) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              handleClick={myRecipesData.handleClick}
              handleOpenModal={handleOpenModal}
            />
          ))}

          {myRecipesData.isFetchingNextPage && (
            <div className="flex justify-center items-center w-full h-[10rem]">
              <LoadingSpinner />
            </div>
          )}

          {noRecipes && (
            <div className="flex flex-col gap-4 items-center justify-center w-full h-[10rem]">
              <p className="text-lg text-center">You haven't added any recipes yet.</p>
              <Button
                variant="secondary"
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
