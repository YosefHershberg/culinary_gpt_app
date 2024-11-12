import { useNavigate } from "react-router-dom";
import { RecipeWithImage as RecipeType } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import useMyRecipes from "@/hooks/useMyRecipes";
import DeleteRecipeModal from "@/components/modals/DeleteRecipeModal";

const MyRecipes: React.FC = () => {
  const navigate = useNavigate()
  const { recipes, handleDelete, handleClick, handleOpenModal, isOpen, handleCloseModal } = useMyRecipes()

  return (
    <main className="w-screen flex-1 flex flex-col items-center bg-amber-100 dark:bg-zinc-700 px-4">
      <div className="my-8 flex flex-col items-center w-full max-w-[40rem]">
        <h1 className="text-2xl font-semibold text-center">My Recipes</h1>
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

        {recipes.map((recipe: RecipeType) => (
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

type RecipeProps = {
  recipe: RecipeType
  handleClick: (recipe: RecipeType) => void,
  handleOpenModal: (recipe: RecipeType) => void
}

const Recipe: React.FC<RecipeProps> = ({ recipe, handleClick, handleOpenModal }) => {

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    handleOpenModal(recipe)
  }

  return (
    <div
      onClick={() => handleClick(recipe)}
      className="relative cursor-pointer mt-6 p-5 w-full bg-orange/20 flex flex-col sm:flex-row items-center rounded-xl shadow-md"
      key={recipe.id}
    >
      <img
        src={recipe.image_url}
        alt={recipe.recipe.title}
        className="sm:w-[7rem] w-[15rem] aspect-square object-cover rounded-lg"
      />
      <div className="sm:mt-0 mt-4 ml-4 flex flex-col sm:justify-around sm:h-full gap-2">
        <h2 className="text-lg font-semibold sm:text-start text-center">{recipe.recipe.title}</h2>
        <p className="text-sm sm:text-start text-center">{recipe.recipe.description}</p>
        <div className="flex gap-10 sm:justify-start justify-center">
          <div>
            <span className="text-sm font-semibold">Time: </span>
            <span className="text-sm">{recipe.recipe.time}</span>
          </div>
          <div>
            <span className="text-sm font-semibold">Level: </span>
            <span className="text-sm">{recipe.recipe.level}</span>
          </div>
        </div>
      </div>
      <Button
        onClick={handleDelete}
        className="absolute top-2 right-2 size-7 bg-transparent hover:bg-orange/40"
        variant='unstyled'
        size='icon'
      >
        <X className="size-5" />
      </Button>
    </div>
  )
}