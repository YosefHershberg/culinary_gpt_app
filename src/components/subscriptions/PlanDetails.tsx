import FeatureList from "./FeatureList";
import { Button } from "../ui/button";
import { Plan } from "@/pages/SubscribePage";

type PlanDetailsProps = {
    plan: Plan;
    onSelectPlan: (plan: Plan) => void;
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ plan, onSelectPlan }) => (
    <div className="w-full flex-1 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-center">
            ${plan.price} {plan.duration}
        </h2>
        <FeatureList features={plan.features} />
        <Button
            variant='secondary'
            className="text-white px-4 py-2 rounded-md"
            onClick={() => onSelectPlan(plan)}
        >
            Choose this plan
        </Button>
    </div>
);

export default PlanDetails;