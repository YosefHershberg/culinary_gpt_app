import { queryOptions } from "@tanstack/react-query";

import { getUserIngredientsAPI } from "@/services/ingredient.service";
import { INGREDIENTS_QUERY_KEY } from "./queryKeys";
import type { Ingredient } from "./types";

// Single definition of the user's ingredients query.
// Every useQuery / useSuspenseQuery on this key must use it, so that each observer has a queryFn.
export const userIngredientsQueryOptions = queryOptions<Ingredient[]>({
    queryKey: INGREDIENTS_QUERY_KEY,
    queryFn: () => getUserIngredientsAPI(),
});
