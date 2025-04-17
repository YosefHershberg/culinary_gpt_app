import axiosClient from "@/config/axiosClient"
import type { KitchenUtils } from "@/lib/types"

export const getUserKitchenUtilsAPI = async (): Promise<KitchenUtils> => {
    const { data } = await axiosClient.get('/user/kitchen-utils')
    return data
}

export const toggleUserKitchenUtilAPI = async (util: string): Promise<KitchenUtils> => {
    const { data } = await axiosClient.patch('/user/kitchen-utils', { name: util, value: true })
    return data
}