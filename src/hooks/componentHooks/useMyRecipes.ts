import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserRecipes } from '@/services/recipe.service';
import { RecipeWithImage } from '@/lib/types';
import useSearchRecipes, { UseSearchRecipesResponse } from './useSearchRecipes';
import { useEffect } from 'react';
import useInfiniteScroll from './useInfiniteScroll';
import useFilterRecipes, { UseFilterRecipesResponse } from './useFilterRecipes';
import useSortRecipes, { UseSortRecipesResponse } from './useSortRecipes';

export const LIMIT = 4;

type UseMyRecipesReturnType = {
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
    searchData: UseSearchRecipesResponse,
    filterData: UseFilterRecipesResponse,
    sortData: UseSortRecipesResponse
};

const useMyRecipes = (): UseMyRecipesReturnType => {
    const searchData = useSearchRecipes();
    const filterData = useFilterRecipes()

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey: ['userRecipes'],
        queryFn: ({ pageParam = 1 }) => getUserRecipes({
            page: pageParam,
            limit: LIMIT,
            query: searchData.debouncedValue,
            filter: filterData.currentFilter
        }),
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.length === LIMIT ? nextPage : undefined;
        },
        initialPageParam: 1,
        throwOnError: true,
    });

    const sortData = useSortRecipes(data?.pages.flatMap(page => page) || []);

    useEffect(() => {
        if (searchData.debouncedValue || searchData.debouncedValue === '') {
            refetch();
        }
    }, [searchData.debouncedValue, filterData.currentFilter]);

    const nextPage = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const sentinelRef = useInfiniteScroll({ isLoading, nextPage });

    return {
        query: {
            recipes: sortData.sortedRecipes,
            isLoading,
            isError,
            nextPage,
            isFetchingNextPage,
            hasNextPage,
            hasData: (data?.pages?.flatMap(page => page).length ?? 0) > 0
        },
        sentinelRef,
        searchData,
        filterData,
        sortData
    };
};

export default useMyRecipes;