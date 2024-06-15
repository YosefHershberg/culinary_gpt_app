import recipe from '@/dummy/recipe'
import { Button } from '@/components/ui/button'
import { useCreateRecipe } from '@/context-providers/create-recipe-provider'
import { useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'

const RecipePage = () => {
    const { createdRecipe } = useCreateRecipe()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (!createdRecipe.recipe) {
            navigate('/create-new-recipe')
        }
    }, []);

    if (createdRecipe.recipe) return (
        <main className='flex flex-col w-screen items-center bg-amber-100 pb-5'>
            <div className='max-w-[50rem] flex flex-col items-center bg-orange/20 py-5 px-10 rounded-2xl m-5'>

                <div className='flex flex-col items-center '>
                    <h2 className='text-2xl font-semibold text-center'>{createdRecipe.recipe.title}</h2>
                    <p className='text-lg text-center mt-4'>{createdRecipe.recipe.description}</p>
                </div>
                <div className='flex flex-col items-center mt-8'>
                    <img src={createdRecipe.image_url} alt={createdRecipe.recipe.title} className='w-80 h-80 object-cover rounded-lg' />
                </div>
                <div className='flex flex-col items-center mt-10'>
                    <h3 className='text-2xl font-semibold'>Ingredients</h3>
                    <ul className='list-disc mt-2 grid grid-cols-2 gap-x-10'>
                        {createdRecipe.recipe.ingredients.map(i => (
                            <li className='mt-2' key={i.ingredient}>{i.ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col items-center mt-10'>
                    <h3 className='text-2xl font-semibold'>Instructions</h3>
                    <ol className='list-decimal mt-2'>
                        {createdRecipe.recipe.steps.map(step => (
                            <li className='mt-2' key={step.step}>{step.step}</li>
                        ))}
                    </ol>
                </div>

            </div>
            <h1 className='font-bold text-6xl italic text-amber-800'>
                Bon Apetite!
            </h1>
            <Button
                variant='secondary'
                className='absolute bottom-5 sm:left-5 left-1/2 transform sm:-translate-x-0 -translate-x-1/2 w-42 h-12 rounded-full px-5 hover:scale-105 transition duration-300 ease-in-out'
            >
                Add to My Recipes
            </Button>
        </main>
    )
}

export default RecipePage