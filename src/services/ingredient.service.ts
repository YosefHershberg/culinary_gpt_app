import axiosClient from "@/config/axiosClient"
import { Ingredient, MessageResponse } from "@/lib/types"

export const getUserIngredients = async (): Promise<Ingredient[]> => {
    const { data } = await axiosClient.get('/user/ingredients')
    return data
}

export const deleteAllUserIngredients = async (): Promise<MessageResponse> => {
    const { data } = await axiosClient.delete('/user/ingredients/all')
    return data
}

export const addUserIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
    const { data } = await axiosClient.post('/user/ingredients', ingredient)
    return data
}

export const addMultipleIngredients = async (ingredients: Ingredient[]): Promise<Ingredient[]> => {
    const { data } = await axiosClient.post('/user/ingredients/multiple', ingredients)
    return data
}

export const deleteUserIngredient = async (ingredient: Ingredient): Promise<MessageResponse> => {
    const { data } = await axiosClient.delete(`/user/ingredients/${ingredient.id}`)
    return data
}

export const getIngredientSuggestions = async (category: string): Promise<Ingredient> => {
    const { data } = await axiosClient.get(`/ingredients/suggestions/${category}`)
    return data
}