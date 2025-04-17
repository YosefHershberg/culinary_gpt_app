import { useTheme } from "@/context/theme-context";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

import bgimage from '@/assets/sign-up-background.webp'

const loadingStates = [
  {
    text: "Sending your recipe request",
  },
  {
    text: "Your request has been received by the AI chef",
  },
  {
    text: "This process usually takes 5 seconds",
  },
  {
    text: "The AI chef is creating the recipe",
  },
  {
    text: "Double checking the recipe for you",
  },
  {
    text: "Almost done...",
  },
  {
    text: "Sending your recipe to you",
  }
];

type LoadingRecipePageProps = {
  duration?: number;
}

const LoadingRecipePage: React.FC<LoadingRecipePageProps> = ({ duration }) => {
  const { theme } = useTheme();

  return (
    <main
      className="bg-cover bg-center h-screen w-screen absolute z-100 flex justify-center items-center flex-col p-5"
      style={theme === 'light' ? { backgroundImage: `url(${bgimage})` } : {}}
    >
      <Loader loadingStates={loadingStates} loading={true} duration={duration || 2200} />
    </main>
  )
}

export default LoadingRecipePage