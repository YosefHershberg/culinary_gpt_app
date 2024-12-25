import axiosClient from "@/config/axiosClient"
import { KitchenUtils } from "@/lib/types"

export const getUserKitchenUtils = async (): Promise<KitchenUtils> => {
    const { data } = await axiosClient.get('/user/kitchen-utils')
    return data
}

export const toggleUserKitchenUtil = async (util: string): Promise<KitchenUtils> => {
    const { data } = await axiosClient.patch('/user/kitchen-utils', { name: util, value: true })
    return data
}