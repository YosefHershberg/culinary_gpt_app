// import Lottie from 'lottie-react'
// import loadingrecipe from '@/assets/animations/loading-recipe-animation.json'

import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

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
    text: "Duble checking the recipe for you",
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

const LoadingRecipePage = () => {
  
  return (
    <div className="h-screen w-screen absolute z-100 flex justify-center items-center flex-col p-5">
       <Loader loadingStates={loadingStates} loading={true} duration={4000} />
    </div>
  )
}

export default LoadingRecipePage