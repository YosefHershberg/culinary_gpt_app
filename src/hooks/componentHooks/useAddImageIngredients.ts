import { useEffect, useState } from 'react'
import { useUserData } from '@/context/user-data-context';
import { Ingredient } from '@/lib/types'

type UseAddImageIngredientsResponse = {
    ingredientResults: IngredientResultsState[] | null;
    handleAddIngredientsFromImage: () => void;
    handleChangeChecked: (index: number) => void;
    handleCheckAllIngredients: () => void;
    handleRemoveAllIngredients: () => void;
    clearIngredientsResults: () => void;
}

export type IngredientResultsState = {
    ingredient: Ingredient;
    checked: boolean;
}

const useAddImageIngredients = (ingredients: Ingredient[] | null): UseAddImageIngredientsResponse => {
    const [ingredientResults, setIngredientResults] = useState<IngredientResultsState[] | null>(null);
    const { addMultipleIngredients } = useUserData();

    useEffect(() => {
        if (ingredients) {
            setIngredientResults(ingredients.map(ingredient => ({ checked: true, ingredient })));
        }
    }, [ingredients]);

    const handleAddIngredientsFromImage = () => {
        if (ingredientResults && ingredientResults.length > 0) {
            const selectedIngredients = ingredientResults
                .filter((ingredient) => ingredient.checked)
                .map((ingredient) => ingredient.ingredient);

            addMultipleIngredients(selectedIngredients);
        }
    }

    const handleChangeChecked = (index: number) => {
        if (!ingredientResults) return;
        setIngredientResults((prevState) => {
            if (!prevState) return null;
            return prevState.map((ingredient, i) => {
                if (i === index) {
                    return { ...ingredient, checked: !ingredient.checked }
                }
                return ingredient;
            })
        })
    }

    const handleCheckAllIngredients = () => {
        if (!ingredientResults) return;
        setIngredientResults((prevState) => {
            if (!prevState) return null;
            return prevState.map((ingredient) => ({ ingredient: ingredient.ingredient, checked: true }))
        })
    }

    const handleRemoveAllIngredients = () => {
        if (!ingredientResults) return;
        setIngredientResults((prevState) => {
            if (!prevState) return null;
            return prevState.map((ingredient) => ({ ingredient: ingredient.ingredient, checked: false }))
            
        })
    }

    const clearIngredientsResults = () => {
        setIngredientResults(null);
    }

    return {
        ingredientResults: ingredientResults || null,
        handleAddIngredientsFromImage,
        handleChangeChecked,
        handleCheckAllIngredients,
        handleRemoveAllIngredients,
        clearIngredientsResults

    }
}

export default useAddImageIngredients