import axiosClient from "@/config/axiosClient"

export const getUserSubscription = async () => {
    const { data } = await axiosClient.get('user/subscriptions/isSubscribed')
    return data
}