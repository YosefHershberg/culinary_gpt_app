import { useState } from 'react';

import IconStepper from '@/components/Stepper';
import { Button } from '@/components/ui/button';
import ChooseIngredients from '@/components/create-recipe-steps/ChooseIngredients';
import ChooseAditional from '@/components/create-recipe-steps/ChooseAditional';
import FinalStep from '@/components/create-recipe-steps/FinalStep';

import { CookingPot, Soup, Milk } from 'lucide-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  { label: 'Ingredients', icon: Milk },
  { label: 'Your kitchen', icon: CookingPot },
  { label: 'Final step', icon: Soup },
]

const CreateNewRecipePage = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-screen flex-1 flex justify-center lg:mt-0 mt-4 pb-4 px-3">
      <div className='w-dvw flex flex-col items-center'>
        <div className='sm:px-10 w-full '>
          <IconStepper
            setActiveStep={setActiveStep}
            activeStep={activeStep}
            steps={steps}
          />
        </div>

        <div className='relative flex-1 max-w-[80rem] w-full p-3 flex'>
          <div className='absolute left-3 top-3 size-24 rounded-full bg-orange/20 lg:flex hidden items-center justify-center text-white text-5xl'>{activeStep + 1}</div>
          {activeStep === 0 &&
            <ChooseIngredients />
          }
          {activeStep === 1 &&
            <ChooseAditional />
          }
          {activeStep === 2 &&
            <FinalStep />
          }
        </div>

        <div className='flex w-full justify-around'>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep - 1)}
            variant='secondary'
            className='h-12 w-42 rounded-full text-xl flex flex-row-reverse justify-center items-center gap-3'
          >
            <span>Previus</span>
            <ArrowLeft />
          </Button>
          <Button
            disabled={activeStep === steps.length - 1}
            onClick={() => setActiveStep(activeStep + 1)}
            variant='secondary'
            className='h-12 w-42 rounded-full text-xl flex flex-row justify-center items-center gap-3'
          >
            <span>Next</span>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateNewRecipePage