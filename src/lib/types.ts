export type Ingredient = {
    id: number | string;
    name: string;
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
    },
    image_url: string,
}