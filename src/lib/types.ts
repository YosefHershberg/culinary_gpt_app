export type Ingredient = {
    id: number | string;
    name: string;
    category?: string;
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