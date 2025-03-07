import Lottie from 'lottie-react'
import cookingAnimation from '@/assets/animations/loading-page-animation.json'

const LoadingPage: React.FC = () => (
  <main className='h-screen w-screen absolute z-100 flex justify-center items-center flex-col'>
    <Lottie animationData={cookingAnimation} className='size-[20rem]' />
    <p className='text-2xl font-bold font-century-gothic'>One moment please...</p>
  </main>
)

export default LoadingPage