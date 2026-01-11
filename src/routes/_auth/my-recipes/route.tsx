import { useEffect, useState } from 'react';
import { createFileRoute, Outlet, retainSearchParams, useNavigate } from '@tanstack/react-router'
import useSearchRecipes from '@/hooks/componentHooks/useSearchRecipes';

import { z } from 'zod';
import SearchRecipesBar from "@/components/my-recipes/SearchRecipesBar";
import FilterOptionsDropdown from '@/components/my-recipes/FilterOptionsDropdown';
import SortOptionsDropdown from '@/components/my-recipes/SortOptionsDropdown';

import { FilterRecipesOptions, SortRecipesOptions } from '@/lib/enums';

// url search params schema
const recipesViewSchema = z.object({
  recipesView: z.object({
    sortBy: z.nativeEnum(SortRecipesOptions).optional(),
    filterBy: z.nativeEnum(FilterRecipesOptions).optional(),
    q: z.string().optional(),
  }).optional(),
});

export type RecipesView = z.infer<typeof recipesViewSchema>;

export const Route = createFileRoute('/_auth/my-recipes')({
  validateSearch: recipesViewSchema.parse,
  search: {
    // Retain the recipesView search param while navigating
    // within or to this route (or it's children!)
    middlewares: [retainSearchParams(['recipesView'])],
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { recipesView } = Route.useSearch();
  const searchBar = useSearchRecipes(recipesView?.q ?? '');
  const [currentSort, setCurrentSort] = useState<SortRecipesOptions>(recipesView?.sortBy ?? SortRecipesOptions.Newest);
  const [currentFilter, setCurrentFilter] = useState<FilterRecipesOptions>(recipesView?.filterBy ?? FilterRecipesOptions.All);

  const navigate = useNavigate({ from: Route.fullPath });

  useEffect(() => {
    navigate({
      search: (_old: RecipesView) => ({
        recipesView: {
          filterBy: currentFilter,
          sortBy: currentSort,
          q: searchBar.debouncedValue,
        }
      }),
      replace: true,
    })
  }, [searchBar.debouncedValue, currentFilter, currentSort]);

  return (
    <main className="w-screen flex-1 flex flex-col items-center bg-amber-100 dark:bg-zinc-700 px-4">
      <div className="my-6 flex flex-col items-center w-full max-w-[40rem]">
        <h1 className="text-2xl font-semibold text-center mb-4">My Recipes</h1>
        <div className="relative h-10 w-full flex gap-3">
          <SearchRecipesBar
            isDebouncing={searchBar.isDebouncing}
            searchValue={searchBar.searchValue}
            handleValueChange={searchBar.handleValueChange}
            setIsSearchBarFocused={searchBar.setIsSearchBarFocused}
          />
          {!searchBar.isSearchBarFocused && (
            <>
              <FilterOptionsDropdown
                handleFilterChange={(value: FilterRecipesOptions) => setCurrentFilter(value)}
                currentFilter={currentFilter}
              />
              <SortOptionsDropdown
                handleSortChange={(value: SortRecipesOptions) => setCurrentSort(value)}
                currentSort={currentSort}
              />
            </>
          )}
        </div>
        <Outlet />
      </div>
    </main>
  );
};