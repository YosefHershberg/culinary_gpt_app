import Lottie from 'lottie-react'
import loadingrecipe from '@/assets/animations/loading-recipe-animation.json'

const LoadingRecipePage = () => {
  
  return (
    <div className='h-screen w-screen absolute z-100 flex justify-center items-center flex-col p-3'>
        <Lottie animationData={loadingrecipe} className='size-[20rem]'/>
        <p className='text-center text-3xl font-bold font-century-gothic'>The AI chef is creating the recipe !</p>
        <p className='text-center text-xl font-bold font-century-gothic mt-3'>This takes about 25 seconds.</p>
        <p className='text-center text-xl font-bold font-century-gothic mt-3'>{`Good time to set the table ;)`}</p>
    </div>
  )
}

export default LoadingRecipePage