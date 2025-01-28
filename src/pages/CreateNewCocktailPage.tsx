import { useState } from 'react';

import IconStepper from '@/components/create-components/Stepper';
import { Button } from '@/components/ui/button';

import { Martini, ArrowLeft, ArrowRight, Milk } from 'lucide-react';
import ChooseDrinks from '@/components/create-cocktail/ChooseDrinks';
import FinalStepCocktail from '@/components/create-cocktail/FinalStepCocktail';

const steps = [
    { label: 'Ingredients', icon: Milk },
    { label: 'Final step', icon: Martini },
]

const CreateNewRecipePage: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="w-screen flex-1 flex justify-center lg:mt-0 mt-4 pb-4 px-3">
            <div className='w-dvw flex flex-col items-center'>
                <div className='sm:px-10 sm:block hidden w-full'>
                    <IconStepper
                        setActiveStep={setActiveStep}
                        activeStep={activeStep}
                        steps={steps}
                        strongColor='#10b981'
                        weakColor='#6ee7b7'
                    />
                </div>

                <div className='relative flex-1 max-w-[80rem] w-full p-3 flex'>
                    <div className='absolute left-3 top-3 size-24 rounded-full bg-emerald-400/20 lg:flex hidden items-center justify-center text-white text-5xl'>{activeStep + 1}</div>
                    {activeStep === 0 &&
                        <ChooseDrinks />
                    }
                    {activeStep === 1 &&
                        <FinalStepCocktail />
                    }
                </div>

                <div className='flex w-full justify-around'>
                    <Button
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(activeStep - 1)}
                        className='bg-emerald-400 h-12 w-42 rounded-full text-xl flex flex-row-reverse justify-center items-center gap-3'
                    >
                        <span>Previous</span>
                        <ArrowLeft />
                    </Button>
                    <Button
                        disabled={activeStep === steps.length - 1}
                        onClick={() => setActiveStep(activeStep + 1)}
                        className='bg-emerald-400 h-12 w-42 rounded-full text-xl flex flex-row justify-center items-center gap-3'
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