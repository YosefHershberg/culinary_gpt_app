import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Recipe } from '@/lib/types'
import { Share2 } from 'lucide-react'
import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface RecipePageProps {
    createdRecipe: Recipe
    addToRecipesbuttonComponent?: JSX.Element
}

const RecipePage = ({ createdRecipe, addToRecipesbuttonComponent }: RecipePageProps) => {
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (!createdRecipe) navigate('/')
    }, [createdRecipe])

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(window.location.href)
        toast({
            title: 'Copied to Clipboard',
            description: 'Now you can share this recipe.',
        })
    }

    return (
        <main className=' flex flex-col w-screen items-center bg-amber-100 dark:bg-zinc-700 pb-5'>
            <div className='max-w-[50rem] flex flex-col items-center bg-orange/20 py-5 px-10 rounded-2xl m-5'>

                <div className='flex flex-col items-center '>
                    <h2 className='text-2xl font-semibold text-center'>{createdRecipe.recipe.title}</h2>
                    <p className='text-lg text-center mt-4'>{createdRecipe.recipe.description}</p>
                </div>
                <div className='flex flex-col items-center mt-8'>
                    <img
                        src={createdRecipe.image_url}
                        alt={createdRecipe.recipe.title}
                        className='max-h-80 object-cover rounded-lg aspect-square'
                    />
                </div>
                <div className='flex flex-col items-center mt-10'>
                    <h3 className='text-2xl font-semibold'>Ingredients</h3>
                    <ul className='list-disc mt-2 sm:grid grid-cols-2 gap-x-10'>
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
            <h1 className='font-bold sm:text-6xl text-5xl italic text-amber-800 dark:text-amber-600'>
                Bon Apetite!
            </h1>

            {/* This is the buttons that appear in the created recipe view */}
            {/* {addToRecipesbuttonComponent} */}
            <div className='absolute bottom-5 flex gap-5 w-full sm:justify-between justify-center px-5'>
                <Button
                    onClick={copyToClipboard}
                    className='min-w-[8rem] h-12 rounded-full px-5 hover:scale-105 flex items-center gap-2'
                    variant='secondary'
                >
                    Share <Share2 className='size-4'/>
                </Button>
                {addToRecipesbuttonComponent}
            </div>
        </main>
    )
}

export default RecipePage