import Lottie from 'lottie-react'
import loadingrecipe from '@/assets/animations/loading-recipe-animation.json'

const LoadingRecipePage = () => {
  return (
    <div className='h-screen w-screen absolute z-100 flex justify-center items-center flex-col'>
        <Lottie animationData={loadingrecipe} className='size-[20rem]'/>
        <p className='text-2xl font-bold font-century-gothic'>{`The AI is creating the recipe :)`}</p>
        <p className='text-2xl font-bold font-century-gothic'>One moment please...</p>
    </div>
  )
}

export default LoadingRecipePage