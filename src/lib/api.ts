import axiosClient from "./axiosClient"
import { Ingredient } from "./types"

export const getIngredientSuggestions = async (category: string) => {
    const { data } = await axiosClient.get(`/ingredient-suggestions/${category}`)
    return data
}

export const getUserIngredients = async (token: string) => {
    const { data } = await axiosClient.get('/user-ingredients', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

export const addUserIngredient = async (ingredient: Ingredient) => {
    const { data } = await axiosClient.post('/user-ingredients', ingredient)
    return data
}

export const removeUserIngredient = async (ingredient: Ingredient) => {
    const { data } = await axiosClient.delete(`/user-ingredients/${ingredient.id}`)
    return data
}