import axiosClient from "@/lib/axiosClient"
import { Ingredient } from "@/lib/types"

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