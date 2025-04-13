import axiosClient from "@/config/axiosClient"
import { MessageResponse, RecipeWithImage } from "@/lib/types"
import { SortIngredientsOptions } from "@/lib/enums";
import { FilterOptions } from "@/hooks/componentHooks/useFilterRecipes"

type getUserRecipesAPIProps = {
    page: number,
    limit: number,
    query?: string,
    sort: SortIngredientsOptions;
    filter: FilterOptions
}

export const getUserRecipesAPI = async ({ page, limit, query, filter, sort }: getUserRecipesAPIProps): Promise<RecipeWithImage[]> => {
    const url = new URL('api/user/recipes', axiosClient.defaults.baseURL)
    url.searchParams.append('page', page.toString())
    url.searchParams.append('limit', limit.toString())
    url.searchParams.append('filter', filter.toString())
    url.searchParams.append('sort', sort.toString())
    
    if (query) {
        url.searchParams.append('query', query)
    }

    const { data } = await axiosClient.get(url.toString())

    return data
}

export const deleteUserRecipeAPI = async (id: string): Promise<MessageResponse> => {        
    const { data } = await axiosClient.delete(`/user/recipes/${id}`)
    return data
}

export const getUserRecipeAPI = async (id: string): Promise<RecipeWithImage> => {
    const { data } = await axiosClient.get(`/user/recipes/${id}`)
    return data
}