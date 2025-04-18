export enum IngredientCategories {
    Common = 'common',
    Dairy = 'dairy',
    Vegetables = 'vegetables',
    Spices = 'spices',
    Carbs = 'carbs',
    Meat = 'meat',
}

export enum DrinksCategories {
    Spirits = 'spirits',
    Liqueurs = 'liqueurs',
    Bitters = 'bitters',
    MixersAndJuices = 'mixers',
    SyrupsAndSweeteners = 'syrups',
    FruitsAndGarnishes = 'fruits',
    HerbsAndSpices = 'herbs',
}

export enum SortIngredientsOptions {
    Popularity = 'popularity',
    Alphabetical = 'alphabetical',
    None = ''
}

export enum SortRecipesOptions { 
    Newest = 'newest',
    Oldest = 'oldest',
    Ascending = 'a-z',
    Descending = 'z-a'
}

export enum FilterRecipesOptions {
    Recipes = 'recipes',
    Cocktails = 'cocktails',
    All = 'all'
}