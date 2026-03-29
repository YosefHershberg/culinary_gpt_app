import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { PageBackground } from "@/components/PageBackground";

const loadingStates = [
  { text: "Sending your recipe request" },
  { text: "Your request has been received by the AI chef" },
  { text: "This process usually takes 5 seconds" },
  { text: "The AI chef is creating the recipe" },
  { text: "Double checking the recipe for you" },
  { text: "Almost done..." },
  { text: "Sending your recipe to you" },
];

type LoadingRecipePageProps = {
  duration?: number;
}

const LoadingRecipePage: React.FC<LoadingRecipePageProps> = ({ duration }) => {
  return (
    <main className="h-screen w-screen absolute z-100 flex justify-center items-center flex-col p-5">
      <PageBackground />
      <div className="relative z-10">
        <Loader loadingStates={loadingStates} loading={true} duration={duration || 2200} />
      </div>
    </main>
  )
}

export default LoadingRecipePage
