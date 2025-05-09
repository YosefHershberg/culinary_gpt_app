import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useCreateRecipe } from '@/context/create-recipe-context';

import { createFileRoute } from '@tanstack/react-router'
import IconStepper from '@/components/create-components/Stepper';
import { Button } from '@/components/ui/button';
import ChooseIngredients from '@/components/create-recipe-steps/ChooseIngredients';
import ChooseAdditional from '@/components/create-recipe-steps/ChooseAdditional';
import FinalStep from '@/components/create-recipe-steps/FinalStep';
import { CookingPot, Soup, Milk, ArrowLeft, ArrowRight } from 'lucide-react';

import { IngredientCategoriesMap } from '@/components/create-recipe-steps/IngredientsCategoriesMap';
import { IngredientCategories } from '@/lib/enums';
import { getIngredientSuggestionsAPI } from '@/services/ingredient.service';
import { QueryKeys } from '@/lib/queryKeys';

export const Route = createFileRoute('/_auth/create-recipe')({
  loader: async ({ context: { queryClient } }) => {
    // Prefetching ingredient suggestions for the recipe creation process
    Promise.all([
      Object.entries(IngredientCategoriesMap).map(([key]) => {
        const category = key as IngredientCategories;
        const queryKey = QueryKeys.IngredientSuggestions(category);
        
        // Check if query data already exists before fetching
        const existingData = queryClient.getQueryData(queryKey);
        if (!existingData) {
          return queryClient.prefetchQuery({
            queryKey,
            queryFn: () => getIngredientSuggestionsAPI(category),
          });
        }
        return Promise.resolve();
      }),
    ])
  },
  component: RouteComponent,
})

const steps = [
  { label: 'Ingredients', icon: Milk },
  { label: 'Your kitchen', icon: CookingPot },
  { label: 'Final step', icon: Soup },
]

function RouteComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const { form } = useCreateRecipe();

  return (
    <main className="w-screen flex-1 flex justify-center lg:mt-0 mt-4 pb-4 px-3">
      <div className='w-dvw flex flex-col items-center'>
        <div className='sm:px-10 sm:block hidden w-full'>
          <IconStepper
            setActiveStep={setActiveStep}
            activeStep={activeStep}
            steps={steps}
          />
        </div>

        <FormProvider {...form}>
          <section className='relative flex-1 max-w-[80rem] w-full p-3 flex'>
            <div className='absolute left-3 top-3 size-24 rounded-full bg-orange/20 lg:flex hidden items-center justify-center text-white text-5xl'>{activeStep + 1}</div>
            {activeStep === 0 &&
              <ChooseIngredients />
            }
            {activeStep === 1 &&
              <ChooseAdditional />
            }
            {activeStep === 2 &&
              <FinalStep />
            }
          </section>
        </FormProvider>

        <div className='flex w-full justify-around'>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep - 1)}
            variant='secondary'
            className='h-12 w-42 rounded-full text-xl flex flex-row-reverse justify-center items-center gap-3'
          >
            <span>Previous</span>
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
    </main>
  )
}
