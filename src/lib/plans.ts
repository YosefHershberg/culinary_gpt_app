import env from "@/utils/env";

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
];
