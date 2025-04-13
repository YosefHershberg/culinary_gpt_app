import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from './useInfiniteScroll';

import { getUserRecipesAPI } from '@/services/recipe.service';
import { RecipeWithImage } from '@/lib/types';
import { RECIPES_QUERY_KEY } from '@/lib/queryKeys';
import { FilterOptions } from '@/hooks/componentHooks/useFilterRecipes';
import { SortIngredientsOptions } from "@/lib/enums";

export const LIMIT = 4;

type useMyRecipesProps = {
    searchQuery: string;
    currentFilter: FilterOptions;
    currentSort: SortIngredientsOptions;
}

type useMyRecipesReturnType = {
    query: {
        recipes: RecipeWithImage[];
        isLoading: boolean;
        isError: boolean;
        nextPage: () => void;
        isFetchingNextPage: boolean;
        hasNextPage: boolean;
        hasData: boolean;
    },
    sentinelRef: React.MutableRefObject<HTMLDivElement | null>
};

const useMyRecipesQuery = ({
    searchQuery, currentFilter, currentSort
}: useMyRecipesProps): useMyRecipesReturnType => {

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey: RECIPES_QUERY_KEY,
        queryFn: ({ pageParam = 1 }) => getUserRecipesAPI({
            page: pageParam,
            limit: LIMIT,
            query: searchQuery,
            filter: currentFilter,
            sort: currentSort
        }),
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.length === LIMIT ? nextPage : undefined;
        },
        initialPageParam: 1,
        throwOnError: true,
    });

    useEffect(() => {
        if (searchQuery || searchQuery === '') {
            refetch();
        }
    }, [searchQuery, currentFilter, currentSort]);

    const nextPage = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const sentinelRef = useInfiniteScroll({ isLoading, nextPage });

    return {
        query: {
            recipes: data?.pages.flatMap(page => page) || [],
            isLoading,
            isError,
            nextPage,
            isFetchingNextPage,
            hasNextPage,
            hasData: (data?.pages?.flatMap(page => page).length ?? 0) > 0
        },
        sentinelRef,
    };
};

export default useMyRecipesQuery;