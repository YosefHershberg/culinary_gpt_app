import { useLayoutEffect, useState } from "react"
import type { RecipeWithImage } from '@/lib/types'
import { SortRecipesOptions } from '@/lib/enums';

export type UseSortRecipesResponse = {
    sortedRecipes: RecipeWithImage[]
    handleSortChange: (value: SortRecipesOptions) => void
    currentSort: SortRecipesOptions
}

const useSortRecipes = (recipes: RecipeWithImage[]): UseSortRecipesResponse => {
    const [sortedRecipes, setSortedRecipes] = useState<RecipeWithImage[]>([]);
    const [currentSort, setCurrentSort] = useState<SortRecipesOptions>(SortRecipesOptions.Oldest);

    useLayoutEffect(() => {
        if (!recipes) return;

        // Create a new sorted array based on the current sort option
        let sorted;
        switch (currentSort) {
            case 'newest':
                sorted = [...recipes].sort((a: RecipeWithImage, b: RecipeWithImage) =>
                    new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime()
                );
                break;
            case 'oldest':
                sorted = [...recipes].sort((a: RecipeWithImage, b: RecipeWithImage) =>
                    new Date(a.createdAt as Date).getTime() - new Date(b.createdAt as Date).getTime()
                );
                break;
            case 'a-z':
                sorted = [...recipes].sort((a: RecipeWithImage, b: RecipeWithImage) =>
                    a.recipe.title.localeCompare(b.recipe.title)
                );
                break;
            case 'z-a':
                sorted = [...recipes].sort((a: RecipeWithImage, b: RecipeWithImage) =>
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