import { useCallback, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PlanDetails from "./PlanDetails";
import { Plan, plans } from "@/pages/SubscribePage";

type PlanTabsProps = {
    onSelectPlan: (plan: Plan) => void;
}

const PlanTabs: React.FC<PlanTabsProps> = ({ onSelectPlan }) => {
    const [activeTab, setActiveTab] = useState<string>(plans[0].id);
    
    const renderTabContent = useCallback(() => {
        const activePlan = plans.find((plan) => plan.id === activeTab) as Plan;

        return (
            <TabsContent
                key={activePlan.id}
                value={activePlan.id}
                className="flex-1 flex flex-col items-center justify-between pb-4"
            >
                <PlanDetails plan={activePlan} onSelectPlan={onSelectPlan} />
            </TabsContent>
        );
    }, [activeTab, onSelectPlan]);

    return (
        <Tabs defaultValue={plans[0].id} className="max-w-[400px] w-full flex-1 flex flex-col">
            <TabsList className="w-full">
                {plans.map((plan) => (
                    <TabsTrigger
                        key={plan.id}
                        value={plan.id}
                        className="flex-1"
                        aria-label={`Select ${plan.id} plan`}
                        onClick={() => setActiveTab(plan.id)}
                    >
                        {plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}
                    </TabsTrigger>
                ))}
            </TabsList>
            {renderTabContent()}
        </Tabs>
    );
};

export default PlanTabs;
