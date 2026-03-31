import axiosClient from "@/config/axiosClient"
import type { KitchenUtil, KitchenUtils } from "@/lib/types"

const COLUMN_TO_DISPLAY: Record<string, KitchenUtil> = {
    stoveTop: "Stove Top",
    oven: "Oven",
    microwave: "Microwave",
    airFryer: "Air Fryer",
    blender: "Blender",
    foodProcessor: "Food Processor",
    slowCooker: "Slow Cooker",
    bbq: "BBQ",
    grill: "Grill",
}

export const getUserKitchenUtilsAPI = async (): Promise<KitchenUtils> => {
    const { data } = await axiosClient.get('/user/kitchen-utils')
    return Object.entries(data).reduce((acc, [key, val]) => {
        const displayName = COLUMN_TO_DISPLAY[key]
        if (displayName) acc[displayName] = val as boolean
        return acc
    }, {} as KitchenUtils)
}

export const toggleUserKitchenUtilAPI = async (util: string): Promise<KitchenUtils> => {
    const { data } = await axiosClient.patch('/user/kitchen-utils', { name: util })
    return Object.entries(data).reduce((acc, [key, val]) => {
        const displayName = COLUMN_TO_DISPLAY[key]
        if (displayName) acc[displayName] = val as boolean
        return acc
    }, {} as KitchenUtils)
}