import axiosClient from "./axiosClient"
import { Ingredient } from "./types"

export const getCommonIngredients = async () => {
    const { data } = await axiosClient.get('/common-ingredient-suggestions')
    return data
}

export const getDairyIngredients = async () => {
    const { data } = await axiosClient.get('/dairy-ingredient-suggestions')
    return data
}

export const getVegetablesIngredients = async () => {
    const { data } = await axiosClient.get('/vegetables-suggestions')
    return data
}

export const getSpicesSuggestions = async () => {
    const { data } = await axiosClient.get('/spices-suggestions')
    return data
}

export const getCarbSuggestions = async () => {
    const { data } = await axiosClient.get('/carb-suggestions')
    return data
}

export const getUserIngredients = async (token: string) => {
    const { data } = await axiosClient.get('/get-user-ingredients', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

export const addUserIngredient = async (ingredient: Ingredient) => {
    const { data } = await axiosClient.post('/add-user-ingredient', ingredient)
    return data
}

export const removeUserIngredient = async (ingredient: Ingredient) => {
    const { data } = await axiosClient.delete(`/remove-user-ingredient/${ingredient.id}`)
    return data
}