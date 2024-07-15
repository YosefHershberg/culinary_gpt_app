import axiosClient from "@/lib/axiosClient"

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