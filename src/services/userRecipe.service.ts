import axiosClient from "@/config/axiosClient"

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