import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import bgimage from '@/assets/sign-up-background.jpg'
import { useTheme } from "@/context/theme-provider";

const loadingStates = [
  {
    text: "Sending your recipe request",
  },
  {
    text: "Your request has been received by the AI chef",
  },
  {
    text: "proccecing your ingedients & kitchen tools etc..",
  },
  {
    text: "The AI chef is creating the recipe",
  },
  {
    text: "Our AI artists are designing the recipe picture",
  },
  {
    text: "Double checking the recipe for you",
  },
  {
    text: "Almost done...",
  },
  {
    text: "Your recipe is ready",
  },
  {
    text: "Sending your recipe to you",
  }
];

const LoadingRecipePage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section
      className="bg-cover bg-center h-screen w-screen absolute z-100 flex justify-center items-center flex-col p-5"
      style={theme === 'light' ? { backgroundImage: `url(${bgimage})` } : {}}
    >
      <Loader loadingStates={loadingStates} loading={true} duration={4000} />
    </section>
  )
}

export default LoadingRecipePage