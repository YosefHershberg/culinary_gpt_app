import axiosClient from "./axiosClient"
import { Ingredient } from "./types"

export const getIngredientSuggestions = async (category: string) => {
    const { data } = await axiosClient.get(`/ingredient-suggestions/${category}`)
    return data
}

//USER INGREDIENTS --------------------------------------------------------------

export const getUserIngredients = async (token: string) => {
    const { data } = await axiosClient.get('/user/ingredients', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}
    
export const addUserIngredient = async (ingredient: Ingredient) => {
    const { data } = await axiosClient.post('/user/ingredients', ingredient)
    return data
}

export const deleteUserIngredient = async (ingredient: Ingredient) => {
    const { data } = await axiosClient.delete(`/user/ingredients/${ingredient.id}`)
    return data
}

//USER KITCHEN UTILS --------------------------------------------------------------

export const getUserKitchenUtils = async (token: string) => {
    const { data } = await axiosClient.get('/user/kitchen-utils', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

export const addUserKitchenUtil = async (util: string) => {
    const { data } = await axiosClient.post('/user/kitchen-utils', { name: util, value: true })
    return data
}

export const deleteUserKitchenUtil = async (util: string) => {
    const { data } = await axiosClient.post('/user/kitchen-utils', { name: util, value: false })
    return data
}

//USER RECIPES --------------------------------------------------------------

export const getUserRecipes = async () => {
    const { data } = await axiosClient.get('/user/recipes')
    return data
}

export const deleteUserRecipe = async (id: string) => {
    const { data } = await axiosClient.delete(`/user/recipes/${id}`)
    return data
}

export const getUserRecipe = async (id: string) => {
    const { data } = await axiosClient.get(`/user/recipes/${id}`)
    return data
}
