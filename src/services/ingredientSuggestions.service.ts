import axiosClient from "@/lib/axiosClient"

export const getIngredientSuggestions = async (category: string) => {
    const { data } = await axiosClient.get(`/ingredient-suggestions/${category}`)
    return data
}