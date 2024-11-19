import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/clerk-react'

import { Button } from '@/components/ui/button'
import About from '@/components/About'
import Footer from '@/components/Footer'
import MoreInfoModal from '@/components/modals/MoreInfoModal'

import kitchenToolsImage from '@/assets/kitchen-tools.png'
import { ArrowRight } from 'lucide-react'

const WelcomePage: React.FC = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useUser()

  return (
    <main>
      <div className="p-10 h-[calc(100vh-4rem)] w-full flex md:flex-row flex-col gap-5">
        <motion.div
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className='md:h-full flex flex-col items-center justify-center md:w-1/2'
        >
          <div className='flex flex-col md:items-start items-center gap-8 md:h-[clamp(10rem,70vh,40rem)] justify-between'>
            <h1 className='text-orange text-xl'>Welcome to CulinaryGPT</h1>
            <p className='text-[clamp(2rem,4vw,10rem)] md:text-start text-center font-bold leading-tight'>
              We'll find you perfect dish to prepare!
            </p>
            <p className='text-xl md:text-start text-center'>
              Say goodbye to boring meals, with AI-powered recipe recommendations, meal plans creation and more... 100,000+ dinners saved so far.
            </p>
            <Button
              onClick={() => navigate(isSignedIn ? '/create-new-recipe' : '/signup')}
              variant='secondary'
              className='group md:ml-10 md:mt-8 flex items-center h-16 w-60 text-xl rounded-full gap-2 font-bold'
            >
              Get Started
              <ArrowRight className='transition-transform transform translate-x-0 group-hover:translate-x-2' />
            </Button>

            <MoreInfoModal>
              <Button
                variant='link'
                className='hover:scale-110 transition-all duration-200 font-bold flex items-center gap-2 text-lg'
              >
                Learn More <ArrowRight className='size-6' />
              </Button>
            </MoreInfoModal>

          </div>
        </motion.div>
        <motion.div
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className='flex md:h-full items-center justify-center flex-1 w-full'
        >
          <img
            className='object-contain max-w-[40rem] md:w-full w-2/3 min-w-[20rem]'
            src={kitchenToolsImage}
            alt="kitchen tools"
          />
        </motion.div>
      </div>
      <About />
      <Footer />
    </main>
  )
}

export default WelcomePage