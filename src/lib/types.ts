import { getIngredientSuggestionsAPI } from "@/services/ingredient.service";
import { IngredientCategories } from "./enums";
import { QueryKeys } from "./queryKeys";

export type Ingredient = {
    id: string;
    name: string;
    category: IngredientCategories;
    popularity?: number;
    type: IngredientType[];
}

export type RecipeWithImage = {
    recipe: Recipe,
    image_url: string | null,
    id?: number | string,
    createdAt?: string | Date | number,
    userId?: string,
}

export type Recipe = {
    title: string,
    description: string,
    ingredients: {
        ingredient: string,
    }[],
    steps: {
        step: string,
        time: string,
    }[],
    time?: string,
    level: string,
    type: 'recipe' | 'cocktail',
    id: string
}

export type KitchenUtils = {
    "Stove Top": boolean,
    "Oven": boolean,
    "Microwave": boolean,
    "Air Fryer": boolean,
    "Blender": boolean,
    "Food Processor": boolean,
    "Slow Cooker": boolean,
    "BBQ": boolean,
    "Grill": boolean,
}

export type IngredientType = 'food' | 'drink';

export type Meals = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'

export type KitchenUtil = keyof KitchenUtils

export type MessageResponse = { message: string }

export type RecipeState = {
    mealSelected: Meals,
    selectedTime: number,
    prompt: string,
    numOfPeople: number,
}

export type CategoryMapType = Record<string, {
    label: string;
    queryKey: ReturnType<typeof QueryKeys.IngredientSuggestions>;
    queryFn: () => ReturnType<typeof getIngredientSuggestionsAPI>;
}>;