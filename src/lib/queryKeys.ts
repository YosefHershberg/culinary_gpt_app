import { type QueryKey } from "@tanstack/react-query";

const INGREDIENTS_QUERY_KEY: QueryKey = ['userIngredients']
const RECIPES_QUERY_KEY: QueryKey = ['userRecipes']
const KITCHEN_UTILS_QUERY_KEY: QueryKey = ['userKitchenUtils']

export const QueryKeys = {
    IngredientSuggestions: (category: string) => ["ingredient-suggestions", category],
    DrinksSuggestions: (category: string) => ["drinks-suggestions", category],
};

export {
    INGREDIENTS_QUERY_KEY,
    RECIPES_QUERY_KEY,
    KITCHEN_UTILS_QUERY_KEY,
}