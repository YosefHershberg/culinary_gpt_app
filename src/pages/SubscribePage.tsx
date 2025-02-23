import PlanTabs from "@/components/subscriptions/PlanTabs";
import { useAuth } from "@/context/auth-context";
import env from "@/utils/env";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export type Plan = {
    id: string;
    link: string;
    priceId: string;
    price: number;
    duration: string;
    features: string[];
}

export const plans: Plan[] = [
    {
        id: "monthly",
        link: env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_cN2dSVecNauC4c8fYZ' : '',
        priceId: env.NODE_ENV === 'development' ? 'price_1QoSKV2ZAvKPWO0J6eMjkvWG' : '',
        price: 8.99,
        duration: '/month',
        features: [
            'Monthly payments',
            'Limitless cocktail creation',
            '1 year of updates',
            '24/7 support'
        ]
    },
    {
        id: "yearly",
        link: env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_4gw9CF9Wx46ecIE002' : '',
        priceId: env.NODE_ENV === 'development' ? 'price_1QoSIK2ZAvKPWO0JtiT6u2bz' : '',
        price: 89.99,
        duration: '/year',
        features: [
            'Yearly payments',
            'Save 20% on yearly payments',
            'Limitless cocktail creation',
            '1 year of updates',
            '24/7 support'
        ]
    },
    {
        id: "test",
        link: env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_aEUaGJgkV6em6kg8wz' : '',
        priceId: env.NODE_ENV === 'development' ? 'price_1Qr2og2ZAvKPWO0JZzcy356C' : '',
        price: 0.51,
        duration: '/month',
        features: [
            'Testly payments',
            'Save 20% on yearly payments',
            'Limitless cocktail creation',
            '1 year of updates',
            '24/7 support'
        ]
    }
];

const SubscribePage: React.FC = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (user.isSubscribed) {
            navigate('/create-new-cocktail')
        }
    }, [user])

    return (
        <main className="w-screen flex-1 flex flex-col items-center bg-amber-100 dark:bg-zinc-700 sm:py-2">
            <section className="flex-1 flex flex-col max-w-[40rem] rounded-2xl w-full bg-white dark:bg-zinc-800 shadow-lg p-4">
                <div className="flex flex-col items-center gap-4 mt-2">
                    <p className="text-lg text-center">Subscription plans</p>
                    <h1 className="text-2xl font-bold text-center">Choose a subscription plan</h1>
                </div>
                <section className="flex flex-col items-center gap-4 mt-10 flex-1">
                    <PlanTabs />
                </section>
            </section>
        </main>
    );
};

export default SubscribePage;