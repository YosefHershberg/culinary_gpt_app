import { Button } from './ui/button'
import { RecipeWithImage } from '@/lib/types'
import Logo from './Logo'
import useCreateRecipePDF from '@/hooks/componentHooks/useCreateRecipePDF'

const DownloadRecipePdfButton = ({ createdRecipe }: { createdRecipe: RecipeWithImage }) => {
    const { generatePDF, contentRef, imageUrl } = useCreateRecipePDF(createdRecipe)

    return (
        <>
            <Button
                onClick={generatePDF}
                className='min-w-[8rem] flex items-center gap-2 h-12 rounded-full px-5 hover:scale-105 transition duration-300 ease-in-out'
            >
                Download PDF
            </Button>
            <div className='hidden'>
                <main ref={contentRef} className='flex flex-col items-center bg-amber-100 dark:bg-zinc-700'>
                    <div className='flex items-center h-10 gap-2'>
                        <Logo />
                    </div>
                    <div className='max-w-[50rem] flex flex-col items-center bg-orange/20 py-5 px-10 rounded-2xl m-5'>

                        <div className='flex flex-col items-center '>
                            <h2 className='text-2xl font-semibold text-center'>{createdRecipe.recipe.title}</h2>
                            <p className='text-lg text-center mt-4'>{createdRecipe.recipe.description}</p>
                        </div>
                        <div className='sm:size-[25rem] rounded-lg flex flex-col items-center mt-8 bg-transparent/10'>
                            <img
                                src={imageUrl as string}
                                alt={createdRecipe.recipe.title}
                                className='size-full object-cover rounded-lg aspect-square'
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
                </main>
            </div>
        </>
    )
}

export default DownloadRecipePdfButton