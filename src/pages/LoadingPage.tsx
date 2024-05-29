import Lottie from 'lottie-react'
import cookinganimation from '@/assets/animations/cooking-lottie1.json'

const LoadingPage = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
        <Lottie animationData={cookinganimation} className='size-[20rem]'/>
        <p className='text-2xl font-bold font-century-gothic'>One moment please...</p>
    </div>
  )
}

export default LoadingPage