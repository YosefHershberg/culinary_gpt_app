import { RecipeWithImage as RecipeType } from "@/lib/types";
import LazyImage from "../ui/LazyImage";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router-dom";

type RecipeProps = {
    recipe: RecipeType
    handleOpenModal: (recipe: RecipeType) => void
}

const Recipe: React.FC<RecipeProps> = ({ recipe, handleOpenModal }) => {
    const navigate = useNavigate()

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        handleOpenModal(recipe)
    }

    return (
        <div
            onClick={() => navigate(`/user-recipe/${recipe.id}`, { state: recipe })}
            className="relative cursor-pointer mt-6 p-5 w-full bg-orange/20 flex flex-col sm:flex-row items-center rounded-xl shadow-md"
            key={recipe.id}
        >
            <LazyImage
                src={recipe.image_url as string}
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

export default Recipe

export const RecipeSkeleton = () => (
    <div className="mt-6 p-5 w-full flex flex-col sm:flex-row items-center rounded-xl shadow-md">
        <Skeleton className="sm:size-[7rem] size-[15rem] rounded-lg" />
        <div className="sm:mt-0 mt-4 ml-4 flex flex-col sm:justify-around sm:items-start items-center sm:h-full gap-2">
            <Skeleton className="w-40 h-7" />

            <Skeleton className="w-64 h-7" />

        </div>
    </div>
)