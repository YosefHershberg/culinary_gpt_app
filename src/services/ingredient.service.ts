import axiosClient from "@/config/axiosClient"
import type { Ingredient, MessageResponse } from "@/lib/types"

export const getUserIngredientsAPI = async (): Promise<Ingredient[]> => {
    const { data } = await axiosClient.get('/user/ingredients')
    return data
}

export const deleteAllUserIngredientsAPI = async (): Promise<MessageResponse> => {
    const { data } = await axiosClient.delete('/user/ingredients/all')
    return data
}

export const addUserIngredientAPI = async (ingredient: Ingredient): Promise<Ingredient> => {
    const { data } = await axiosClient.post('/user/ingredients', ingredient)
    return data
}

export const addMultipleUserIngredientsAPI = async (ingredients: Ingredient[]): Promise<Ingredient[]> => {
    const { data } = await axiosClient.post('/user/ingredients/multiple', ingredients)
    return data
}

export const deleteUserIngredientAPI = async (ingredient: Ingredient): Promise<MessageResponse> => {
    const { data } = await axiosClient.delete(`/user/ingredients/${ingredient.id}`)
    return data
}

export const getIngredientSuggestionsAPI = async (category: string): Promise<Ingredient[]> => {
    const { data } = await axiosClient.get(`/ingredients/suggestions/${category}`)
    return data
}

export const detectImageForIngredientsAPI = async (base64Image: string): Promise<Ingredient[]> => {
    const { data } = await axiosClient.post('/ingredients/image-detect', { imageUrl: base64Image })
    return data
}

export const searchIngredientsAPI = async (query: string, type: string): Promise<Ingredient[]> => {
    const { data } = await axiosClient.get('/ingredients/search', { params: { query, type } });
    return data;
};