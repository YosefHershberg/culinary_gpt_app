import { useCallback, useEffect, useState } from "react"
import { QueryKey, useSuspenseQuery } from "@tanstack/react-query"
import { useIngredientList } from "@/context/ingredient-list-context"

import { toast } from "@/components/ui/use-toast"
import { OptionCheckbox } from "@/components/ui/OptionCheckbox"

import { SortIngredientsOptions } from "@/lib/enums"
import type { Ingredient } from "@/lib/types"

type UsualIngredientsContent = {
    queryKey: QueryKey,
    queryFn: () => Promise<Ingredient[]>
}

const IngredientsList: React.FC<UsualIngredientsContent> = ({ queryKey, queryFn }) => {
    const { sortOption, handleClicked } = useIngredientList()
    const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>()

    const { data: ingredients, error } = useSuspenseQuery({
        queryKey: queryKey,
        queryFn: queryFn,
    })

    useEffect(() => {
        if (ingredients) {
            let filteredIngredients = [...ingredients];
            switch (sortOption) {
                case SortIngredientsOptions.Popularity:
                    filteredIngredients = filteredIngredients.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
                    break;
                case SortIngredientsOptions.Alphabetical:
                    filteredIngredients = filteredIngredients.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case SortIngredientsOptions.None:
                    break;
            }
            setFilteredIngredients(filteredIngredients);
        }
    }, [sortOption, ingredients]);

    const handleClickedWrapper = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const ingredientId = (e.target as HTMLElement).id;
        if (ingredientId) {
            const ingredient = ingredients?.find(ing => ing.id.toString() === ingredientId);
            if (ingredient) {
                handleClicked(ingredient);
            }
        }
    }, [handleClicked])

    if (error) {
        toast({
            variant: "destructive",
            title: "Oops! Something went wrong!",
            //@ts-expect-error
            description: error?.response?.data?.message || "An error occurred while fetching ingredients.",
        })
        return (<div>Error</div>)
    }


    return (
        <div
            className="flex-[1_1_0] flex gap-3 flex-wrap overflow-y-auto"
            onClick={handleClickedWrapper}
        >
            {filteredIngredients?.map((ingredient: Ingredient) => (
                <OptionCheckbox
                    key={ingredient.id}
                    ingredient={ingredient}
                />
            ))}
        </div>
    )
}

export default IngredientsList