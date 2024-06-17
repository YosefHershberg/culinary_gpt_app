import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query"
import useOptDeleteUserRecipe from "@/hooks/useOptDeleteUserRecipe";
import { getUserRecipes } from "@/lib/api"

import { Button } from "@/components/ui/button";
import { Recipe } from "@/lib/types";
import { X } from "lucide-react";

const MyRecipes = () => {
  const deleteUserRecipeMutation = useOptDeleteUserRecipe()
  const navigate = useNavigate()

  const { data: recipes } = useSuspenseQuery({
    queryKey: ['userRecipes'],
    queryFn: getUserRecipes,
  })

  const handleClick = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: recipe })
  }

  const handleDelete = (recipe: Recipe, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    deleteUserRecipeMutation.mutate(recipe)
  }

  return (
    <main className="w-screen flex-1 flex flex-col items-center bg-amber-100 dark:bg-zinc-700 px-4">
      <div className="my-8 flex flex-col items-center w-full max-w-[40rem]">
        <h1 className="text-2xl font-semibold text-center">My Recipes</h1>
        {recipes?.map((item: Recipe) => (
          <div
            onClick={() => handleClick(item)}
            className="relative cursor-pointer mt-6 p-5 w-full bg-orange/20 flex flex-col sm:flex-row items-center rounded-xl shadow-md"
            key={item.id}
          >
            <img
              src={item.image_url}
              alt={item.recipe.title}
              className="sm:w-[7rem] w-[15rem] aspect-square object-cover rounded-lg"
            />
            <div className="ml-4 flex flex-col sm:justify-around sm:h-full gap-2">
              <h2 className="text-lg font-semibold sm:text-start text-center">{item.recipe.title}</h2>
              <p className="text-sm sm:text-start text-center">{item.recipe.description}</p>
              <div className="flex gap-10 sm:justify-start justify-center">
                <div>
                  <span className="text-sm font-semibold">Time: </span>
                  <span className="text-sm">{item.recipe.time}</span>
                </div>
                <div>
                  <span className="text-sm font-semibold">Level: </span>
                  <span className="text-sm">{item.recipe.level}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={(e) => handleDelete(item, e)}
              className="absolute top-2 right-2 size-7 bg-transparent hover:bg-orange/40"
              variant='unstyled'
              size='icon'
            >
              <X className="size-5" />
            </Button>
          </div>
        ))}
      </div>
    </main >
  )
}

export default MyRecipes