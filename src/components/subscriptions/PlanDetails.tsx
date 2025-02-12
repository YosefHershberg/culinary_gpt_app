import FeatureList from "./FeatureList";
import { Button } from "../ui/button";
import { Plan } from "@/pages/SubscribePage";
import { useAuth } from "@/context/auth-context";

const PlanDetails: React.FC<{ plan: Plan }> = ({ plan }) => {
    const { user } = useAuth()

    return (
        <div className="w-full flex-1 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold text-center">
                ${plan.price} {plan.duration}
            </h2>
            <FeatureList features={plan.features} />
            <Button
                variant='secondary'
                className="text-white px-4 py-2 rounded-md"
                asChild
            >
                <a
                    href={`${plan.link}?prefilled_email=${user.emailAddresses[0].emailAddress}&client_reference_id=${user.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Choose this plan
                </a>
            </Button>
        </div>
    )
}

export default PlanDetails;