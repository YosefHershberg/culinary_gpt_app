import axiosClient from "@/config/axiosClient"

export const getUserSubscriptionAPI = async () => {
    const { data } = await axiosClient.get('user/subscriptions/isSubscribed')
    return data
}

export const deleteUserAccountAPI = async (): Promise<{ message: string }> => {
    const { data } = await axiosClient.delete('user/account')
    return data
}