import { QueryKeys } from "@/lib/queryKeys";
import { getIngredientSuggestionsAPI } from "@/services/ingredient.service";

import { IngredientCategories } from "@/lib/enums";
import type { CategoryMapType } from "@/lib/types";

export const IngredientCategoriesMap: CategoryMapType = {
    [IngredientCategories.Common]: {
        label: IngredientCategories.Common,
        queryKey: QueryKeys.IngredientSuggestions(IngredientCategories.Common),
        queryFn: () => getIngredientSuggestionsAPI(IngredientCategories.Common),
    },
    [IngredientCategories.Dairy]: {
        label: IngredientCategories.Dairy,
        queryKey: QueryKeys.IngredientSuggestions(IngredientCategories.Dairy),
        queryFn: () => getIngredientSuggestionsAPI(IngredientCategories.Dairy),
    },
    [IngredientCategories.Vegetables]: {
        label: IngredientCategories.Vegetables,
        queryKey: QueryKeys.IngredientSuggestions(IngredientCategories.Vegetables),
        queryFn: () => getIngredientSuggestionsAPI(IngredientCategories.Vegetables),
    },
    [IngredientCategories.Spices]: {
        label: IngredientCategories.Spices,
        queryKey: QueryKeys.IngredientSuggestions(IngredientCategories.Spices),
        queryFn: () => getIngredientSuggestionsAPI(IngredientCategories.Spices),
    },
    [IngredientCategories.Carbs]: {
        label: IngredientCategories.Carbs,
        queryKey: QueryKeys.IngredientSuggestions(IngredientCategories.Carbs),
        queryFn: () => getIngredientSuggestionsAPI(IngredientCategories.Carbs),
    },
    [IngredientCategories.Meat]: {
        label: IngredientCategories.Meat,
        queryKey: QueryKeys.IngredientSuggestions(IngredientCategories.Meat),
        queryFn: () => getIngredientSuggestionsAPI(IngredientCategories.Meat),
    }
};
