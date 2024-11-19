import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import DeleteRecipeModal from "@/components/modals/DeleteRecipeModal";
import useMyRecipes from "@/hooks/componentHooks/useMyRecipes";
import useDeleteRecipe from "@/hooks/componentHooks/useDeleteRecipe";
import useFilterRecipes from "@/hooks/componentHooks/useFilterRecipes";

import { RecipeWithImage as RecipeType } from "@/lib/types";
import FilterOptionsDropdown from "@/components/my-recipes/FilterOptionsDropdown";
import Recipe from "@/components/my-recipes/Recipe";
import useSortRecipes from "@/hooks/componentHooks/useSortRecipes";
import SortOptionsDropdown from "@/components/my-recipes/SortOptionsDropdown";

const MyRecipes: React.FC = () => {
  const navigate = useNavigate()
  const { recipes, handleClick } = useMyRecipes()
  const { isOpen, handleDelete, handleOpenModal, handleCloseModal } = useDeleteRecipe()
  const { filteredRecipes, handleFilterChange, currentFilter } = useFilterRecipes(recipes)
  const { sortedRecipes, handleSortChange, currentSort } = useSortRecipes(filteredRecipes)

  return (
    <main className="w-screen flex-1 flex flex-col items-center bg-amber-100 dark:bg-zinc-700 px-4">
      <div className="my-6 flex flex-col items-center w-full max-w-[40rem]">
        <h1 className="text-2xl font-semibold text-center">My Recipes</h1>
        <div className="relative h-10 w-full flex gap-3">
          <FilterOptionsDropdown
            handleFilterChange={handleFilterChange}
            currentFilter={currentFilter}
          />
          <SortOptionsDropdown handleSortChange={handleSortChange} currentSort={currentSort} />
        </div>
        {recipes.length === 0 &&
          <div className="flex flex-col items-center">
            <p className="text-center text-xl mt-10">You have no recipes yet!</p>
            <Button
              variant='secondary'
              onClick={() => navigate('/create-new-recipe')}
              className="mt-6 w-fit"
            >
              Create a new recipe
            </Button>
          </div>
        }

        {sortedRecipes.map((recipe: RecipeType) => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
            handleClick={handleClick}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </div>

      <DeleteRecipeModal
        isOpen={isOpen}
        close={handleCloseModal}
        handleClick={handleDelete}
      />

    </main >
  )
}

export default MyRecipes
