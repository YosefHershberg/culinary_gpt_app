import { useLayoutEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

import PlanTabs from "@/components/subscriptions/PlanTabs";
import useFetchSubscription from "@/hooks/useFetchSubscription";

const SubscribePage: React.FC = () => {
    const { isSubscribed } = useFetchSubscription()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (isSubscribed) {
            navigate({ to: '/create-recipe' })
        }
    }, [isSubscribed, navigate])

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