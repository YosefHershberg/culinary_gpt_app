export type Ingredient = {
    id: string;
    name: string;
    category: string;
    popularity: number;
    type: IngredientType[];
}

export type RecipeWithImage = {
    recipe: Recipe,
    image_url: string,
    id?: number | string,
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
}

export type RecipeState = {
    recipe: Recipe,
    image_url: string | null,
    id?: number | string, 
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
