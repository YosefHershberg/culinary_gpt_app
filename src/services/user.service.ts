import axiosClient from "@/config/axiosClient"

export const getUserSubscriptionAPI = async () => {
    const { data } = await axiosClient.get('user/subscriptions/isSubscribed')
    return data
}