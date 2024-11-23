import axiosClient from "@/config/axiosClient"

export const getUserKitchenUtils = async () => {
    const { data } = await axiosClient.get('/user/kitchen-utils')
    return data
}

export const toggleUserKitchenUtil = async (util: string) => {
    const { data } = await axiosClient.patch('/user/kitchen-utils', { name: util, value: true })
    return data
}