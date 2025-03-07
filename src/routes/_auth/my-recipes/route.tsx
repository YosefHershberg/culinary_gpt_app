import { createFileRoute, Outlet, retainSearchParams, useNavigate } from '@tanstack/react-router'
import SearchRecipesBar from "@/components/my-recipes/SearchRecipesBar";
import { useEffect, useState } from 'react';
import { z } from 'zod';
import useSearchRecipes from '@/hooks/componentHooks/useSearchRecipes';
import FilterOptionsDropdown from '@/components/my-recipes/FilterOptionsDropdown';
import SortOptionsDropdown from '@/components/my-recipes/SortOptionsDropdown';

const recipesViewSchema = z.object({
  recipesView: z.object({
    sortBy: z.enum(['newest', 'oldest', 'a-z', 'z-a']).optional(),
    filterBy: z.enum(['recipes', 'cocktails', 'all']).optional(),
    q: z.string().optional(),
  }).optional(),
});

export type RecipesView = z.infer<typeof recipesViewSchema>;
export type SortOptions = 'newest' | 'oldest' | 'a-z' | 'z-a'
export type FilterOptions = 'recipes' | 'cocktails' | 'all'

export const Route = createFileRoute('/_auth/my-recipes')({
  validateSearch: recipesViewSchema.parse,
  search: {
    // Retain the usersView search param while navigating
    // within or to this route (or it's children!)
    middlewares: [retainSearchParams(['recipesView'])],
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { recipesView } = Route.useSearch();
  const searchBar = useSearchRecipes(recipesView?.q ?? '');
  const [currentSort, setCurrentSort] = useState<SortOptions>(recipesView?.sortBy ?? 'newest');
  const [currentFilter, setCurrentFilter] = useState<FilterOptions>(recipesView?.filterBy ?? 'all');

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
                handleFilterChange={(value: FilterOptions) => setCurrentFilter(value)}
                currentFilter={currentFilter}
              />
              <SortOptionsDropdown
                handleSortChange={(value: SortOptions) => setCurrentSort(value)}
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