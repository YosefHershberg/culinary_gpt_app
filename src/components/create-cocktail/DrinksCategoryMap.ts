import { DrinksCategories } from "@/lib/enums";
import { QueryKeys } from "@/lib/queryKeys";
import { getIngredientSuggestionsAPI } from "@/services/ingredient.service";
import { CategoryMapType } from "@/lib/types";

export const DrinksCatgoriesMap: CategoryMapType = {
    [DrinksCategories.Spirits]: {
        label: DrinksCategories.Spirits,
        queryKey: QueryKeys.DrinksSuggestions(DrinksCategories.Spirits),
        queryFn: () => getIngredientSuggestionsAPI(DrinksCategories.Spirits),
    },
    [DrinksCategories.Liqueurs]: {
        label: DrinksCategories.Liqueurs,
        queryKey: QueryKeys.DrinksSuggestions(DrinksCategories.Liqueurs),
        queryFn: () => getIngredientSuggestionsAPI(DrinksCategories.Liqueurs),
    },
    [DrinksCategories.Bitters]: {
        label: DrinksCategories.Bitters,
        queryKey: QueryKeys.DrinksSuggestions(DrinksCategories.Bitters),
        queryFn: () => getIngredientSuggestionsAPI(DrinksCategories.Bitters),
    },
    [DrinksCategories.MixersAndJuices]: {
        label: DrinksCategories.MixersAndJuices,
        queryKey: QueryKeys.DrinksSuggestions(DrinksCategories.MixersAndJuices),
        queryFn: () => getIngredientSuggestionsAPI(DrinksCategories.MixersAndJuices),
    },
    [DrinksCategories.SyrupsAndSweeteners]: {
        label: DrinksCategories.SyrupsAndSweeteners,
        queryKey: QueryKeys.DrinksSuggestions(DrinksCategories.SyrupsAndSweeteners),
        queryFn: () => getIngredientSuggestionsAPI(DrinksCategories.SyrupsAndSweeteners),
    },
    [DrinksCategories.FruitsAndGarnishes]: {
        label: DrinksCategories.FruitsAndGarnishes,
        queryKey: QueryKeys.DrinksSuggestions(DrinksCategories.FruitsAndGarnishes),
        queryFn: () => getIngredientSuggestionsAPI(DrinksCategories.FruitsAndGarnishes),
    },
    [DrinksCategories.HerbsAndSpices]: {
        label: DrinksCategories.HerbsAndSpices,
        queryKey: QueryKeys.DrinksSuggestions(DrinksCategories.HerbsAndSpices),
        queryFn: () => getIngredientSuggestionsAPI(DrinksCategories.HerbsAndSpices),
    }
};