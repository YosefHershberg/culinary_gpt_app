import { useState } from 'react';
import useHttpClient from '@/hooks/useHttpClient';

import IconStepper from '@/components/Stepper';
import { Button } from '@/components/ui/button';
import ChooseIngredients from '@/components/create-recipe-steps/ChooseIngredients';
import ChooseAditional from '@/components/create-recipe-steps/ChooseAditional';
import FinalStep from '@/components/create-recipe-steps/FinalStep';

import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  { label: 'Ingredients', icon: ShoppingCartRoundedIcon },
  { label: 'Your kitchen', icon: ContactsRoundedIcon },
  { label: 'Final step', icon: LocalShippingRoundedIcon },
]

export type Meals = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'

const CreateNewRecipe = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [mealSelected, setMealSelected] = useState<Meals>('lunch')
  const [selectedTime, setSelectedTime] = useState<number>(50)
  const [prompt, setPrompt] = useState<string>('')

  //@ts-ignore
  const { data: result, isLoading, error, triggerHttpReq } = useHttpClient({
    endpoint: '/api/ingredients',
    method: 'POST',
    body: {
      mealSelected, selectedTime
    }
  })

  const handleMealSelected = (value: Meals) => {
    setMealSelected(value)
  }

  const handleTimeChange = (value: number[]) => {
    setSelectedTime(value[0] + 5)
  }
  const handlePromptChange = (value: string) => {
    setPrompt(value)
  }

  const handleSubmit = () => {
    console.log('submit')
    console.log(mealSelected, selectedTime);
  }

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
            <ChooseAditional
              handleMealSelected={handleMealSelected}
              selectedTime={selectedTime}
              handleTimeChange={handleTimeChange}
            />
          }
          {activeStep === 2 &&
            <FinalStep
              prompt={prompt}
              handlePromptChange={handlePromptChange}
              handleSubmit={handleSubmit}
            />
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

export default CreateNewRecipe