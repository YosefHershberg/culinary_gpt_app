import axiosClient from "@/config/axiosClient"
import { MessageResponse, RecipeWithImage } from "@/lib/types"

export const getUserRecipes = async (): Promise<RecipeWithImage[]> => {
    const { data } = await axiosClient.get('/user/recipes')
    return data
}

export const deleteUserRecipe = async (id: string): Promise<MessageResponse> => {
    const { data } = await axiosClient.delete(`/user/recipes/${id}`)
    return data
}

export const getUserRecipe = async (id: string): Promise<RecipeWithImage> => {
    const { data } = await axiosClient.get(`/user/recipes/${id}`)
    return data
}