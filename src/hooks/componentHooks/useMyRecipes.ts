import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserRecipes } from '@/services/recipe.service';
import { RecipeWithImage } from '@/lib/types';
import useInfiniteScroll from './useInfiniteScroll';
import { FilterOptions, SortOptions } from '@/routes/_auth/my-recipes/route';

export const LIMIT = 4;

type UseMyRecipesProps = {
    searchQuery: string;
    currentFilter: FilterOptions;
    currentSort: SortOptions;
}

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
};

const useMyRecipes = ({
    searchQuery, currentFilter, currentSort
}: UseMyRecipesProps): UseMyRecipesReturnType => {

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey: ['userRecipes'],
        queryFn: ({ pageParam = 1 }) => getUserRecipes({
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

export default useMyRecipes;