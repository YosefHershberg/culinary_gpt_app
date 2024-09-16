export type Ingredient = {
    id: string;
    name: string;
    category: string;
    popularity: number;
}

export type Recipe = {
    recipe: {
        title: string,
        description: string,
        ingredients: {
            ingredient: string,
        }[],
        steps: {
            step: string,
            time: string,
        }[],
        time: string,
        level: string,
    },
    image_url: string,
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