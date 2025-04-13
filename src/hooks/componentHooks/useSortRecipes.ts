import { useLayoutEffect, useState } from "react"
import { RecipeWithImage as RecipeType } from '@/lib/types'
import { SortRecipesOptions } from '@/lib/enums';

export type UseSortRecipesResponse = {
    sortedRecipes: RecipeType[]
    handleSortChange: (value: SortRecipesOptions) => void
    currentSort: SortRecipesOptions
}

const useSortRecipes = (recipes: RecipeType[]): UseSortRecipesResponse => {
    const [sortedRecipes, setSortedRecipes] = useState<RecipeType[]>([]);
    const [currentSort, setCurrentSort] = useState<SortRecipesOptions>(SortRecipesOptions.Oldest);

    useLayoutEffect(() => {
        if (!recipes) return;

        // Create a new sorted array based on the current sort option
        let sorted;
        switch (currentSort) {
            case 'newest':
                sorted = [...recipes].sort((a: RecipeType, b: RecipeType) =>
                    new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime()
                );
                break;
            case 'oldest':
                sorted = [...recipes].sort((a: RecipeType, b: RecipeType) =>
                    new Date(a.createdAt as Date).getTime() - new Date(b.createdAt as Date).getTime()
                );
                break;
            case 'a-z':
                sorted = [...recipes].sort((a: RecipeType, b: RecipeType) =>
                    a.recipe.title.localeCompare(b.recipe.title)
                );
                break;
            case 'z-a':
                sorted = [...recipes].sort((a: RecipeType, b: RecipeType) =>
                    b.recipe.title.localeCompare(a.recipe.title)
                );
                break;
            default:
                sorted = [...recipes];
                break;
        }

        // Only update the state if the sorted array is different from the current sortedRecipes
        if (JSON.stringify(sorted) !== JSON.stringify(sortedRecipes)) {
            setSortedRecipes(sorted);
        }
    }, [currentSort, recipes]);

    const handleSortChange = (value: SortRecipesOptions) => {
        setCurrentSort(value);
    };

    return {
        sortedRecipes,
        handleSortChange,
        currentSort
    };
};

export default useSortRecipes