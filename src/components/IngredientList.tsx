import { useQuery } from "@tanstack/react-query"
import { toast } from "./ui/use-toast"
import LoadingSpinner from "./ui/LoadingSpinner"
import { Ingredient } from "@/lib/types"
import { OptionCheckbox } from "./ui/OptionCheckbox"

type UsualIngredientsContent = {
    queryKey: string,
    queryFn: () => Promise<any>
}

const IngredientsList = ({ queryKey, queryFn }: UsualIngredientsContent) => {
    const { data: ingredients, isLoading, error } = useQuery({
        queryKey: [`${queryKey}`],
        queryFn: queryFn,
    })

    if (error) {
        toast({
            variant: "destructive",
            title: "Oops! Something went wrong!",
            //@ts-expect-error
            description: error?.response?.data?.message || "An error occurred while fetching ingredients.",
        })
        return (<div>Error</div>) //TODO: add error image/ component
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <LoadingSpinner className="size-16" />
            </div>
        )
    }

    return (
        <div className="flex-[1_1_0] flex gap-3 flex-wrap overflow-y-auto">
            {ingredients?.map((ingredient: Ingredient) => (
                <OptionCheckbox
                    key={ingredient.id}
                    ingredient={ingredient}
                />
            ))}
        </div>
    )
}

export default IngredientsList