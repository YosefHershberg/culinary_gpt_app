import axiosClient from "@/config/axiosClient"

export const getUserSubscription = async () => {
    const { data } = await axiosClient.get('user/subscription')
    return data
}