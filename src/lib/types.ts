import { IngredientCategories } from "./enums";

export type Ingredient = {
    id: string;
    name: string;
    category?: (typeof IngredientCategories)[keyof typeof IngredientCategories];
    popularity?: number;
    type?: IngredientType[];
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
    type: 'recipe' | 'cocktail'
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