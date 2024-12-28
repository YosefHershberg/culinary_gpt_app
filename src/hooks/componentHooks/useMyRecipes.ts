import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserRecipes } from '@/services/recipe.service';
import { RecipeWithImage } from '@/lib/types';
import useSearchRecipes, { UseSearchRecipesResponse } from './useSearchRecipes';
import { useEffect } from 'react';
import useInfiniteScroll from './useInfiniteScroll';

export const LIMIT = 4;

type UseMyRecipesResponse = {
    recipes: RecipeWithImage[];
    handleClick: (recipe: RecipeWithImage) => void;
    isLoading: boolean;
    isError: boolean;
    nextPage: () => void;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    hasData: boolean;
    sentinelRef: React.MutableRefObject<HTMLDivElement | null>
    search: UseSearchRecipesResponse
};

const useMyRecipes = (): UseMyRecipesResponse => {
    const navigate = useNavigate();
    const search = useSearchRecipes();

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey: ['userRecipes'],
        queryFn: ({ pageParam = 1 }) => getUserRecipes({
            page: pageParam,
            limit: LIMIT,
            query: search.debouncedValue
        }),
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.length === LIMIT ? nextPage : undefined;
        },
        initialPageParam: 1,
        throwOnError: true,
    });

    useEffect(() => {
        if (search.debouncedValue || search.debouncedValue === '') {
            refetch();
        }
    }, [search.debouncedValue]);

    const handleClick = (recipe: RecipeWithImage) => {
        navigate(`/user-recipe/${recipe.id}`, { state: recipe });
    };

    const nextPage = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const sentinelRef = useInfiniteScroll({ isLoading, nextPage });

    return {
        recipes: data?.pages.flatMap(page => page) || [],
        handleClick,
        isLoading,
        isError,
        nextPage,
        isFetchingNextPage,
        hasNextPage,
        hasData: (data?.pages?.flatMap(page => page).length ?? 0) > 0,
        sentinelRef,
        search
    };
};

export default useMyRecipes;