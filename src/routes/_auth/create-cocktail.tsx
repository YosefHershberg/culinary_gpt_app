import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'

import IconStepper from '@/components/create-components/Stepper';
import { Button } from '@/components/ui/button';
import ChooseDrinks from '@/components/create-cocktail/ChooseDrinks';
import FinalStepCocktail from '@/components/create-cocktail/FinalStepCocktail';
import { DrinksCategoriesMap } from '@/components/create-cocktail/DrinksCategoryMap';
import { Martini, ArrowLeft, ArrowRight, Milk } from 'lucide-react';
import { QueryKeys } from '@/lib/queryKeys';

import { DrinksCategories } from '@/lib/enums';
import { getIngredientSuggestionsAPI } from '@/services/ingredient.service';

export const Route = createFileRoute('/_auth/create-cocktail')({
    loader: async ({ context: { queryClient } }) => {
        // Prefetching ingredient suggestions for the cocktail creation process
        Promise.all([
            Object.entries(DrinksCategoriesMap).map(([key]) => {
                const category = key as DrinksCategories;
                const queryKey = QueryKeys.DrinksSuggestions(category);

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
    { label: 'Final step', icon: Martini },
]

function RouteComponent() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <main className="w-screen flex-1 flex justify-center lg:mt-0 mt-4 pb-4 px-3">
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

                <section className='relative flex-1 max-w-[80rem] w-full p-3 flex'>
                    <div className='absolute left-3 top-3 size-24 rounded-full bg-emerald-400/20 lg:flex hidden items-center justify-center text-white text-5xl'>{activeStep + 1}</div>
                    {activeStep === 0 &&
                        <ChooseDrinks />
                    }
                    {activeStep === 1 &&
                        <FinalStepCocktail />
                    }
                </section>

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
        </main>
    )
}
