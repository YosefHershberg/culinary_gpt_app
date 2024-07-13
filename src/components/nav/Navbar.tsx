import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTheme } from '@/context/theme-provider'
import { useUserData } from '@/context/user-data-provider'
import { useAuth } from '@/context/auth-provider'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import LoadingSpinner from '@/components/ui/LaodingSpinner'
import MobileNavMenu from '@/components/nav/MobileNavMenu'
import Logo from '@/components/Logo'

import { UserButton } from '@clerk/clerk-react'
import { LaptopMinimal, Moon, Sun } from 'lucide-react'


const Navbar = () => {
    const { theme, setTheme } = useTheme()
    const navigate = useNavigate()
    const { isSignedIn, isLoaded } = useAuth()
    const { userIngredients } = useUserData()
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (userIngredients.length > 0) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 200);
            return () => clearTimeout(timer);
        }
    }, [userIngredients]);

    return (
        <nav className=' nt flex min-h-16 w-full sm:px-8 px-4 items-center justify-between'>
            <div className='flex items-center gap-4'>
                <a href="/">
                    <Logo />
                </a>
                {isSignedIn &&
                    <ul className='md:flex hidden items-center gap-5 ml-7'>
                        <li>
                            <Button
                                onClick={() => navigate('/create-new-recipe')}
                                variant='secondary'
                                className='transition-all duration-200 hover:scale-105 h-8'
                            >
                                Create New Recipe
                            </Button>
                        </li>
                        <li className='size-fit relative'>
                            <Button
                                onClick={() => navigate('/my-ingredients')}
                                variant='unstyled'
                                className={`z-10 font-bold text-primary/60 hover:text-primary transition-all duration-200 ${isAnimating ? 'text-primary/100 transition-colors duration-300 scale-105' : ''
                                    } hover:scale-105`}
                            >
                                My Ingredients
                            </Button>
                            {userIngredients.length > 0 &&
                                <span className='absolute text-secondary p-1 min-w-5 h-5 rounded-full bg-red-400 flex justify-center items-center top-0 right-[-0.4rem] text-[0.7rem]'>
                                    {userIngredients.length > 100 ? '99+' : userIngredients.length}
                                </span>
                            }
                        </li>
                        <li>
                            <Button
                                onClick={() => navigate('/my-recipes')}
                                variant='unstyled'
                                className='font-bold text-primary/60 hover:text-primary transition-all duration-200 hover:scale-105'
                            >
                                My Recipes
                            </Button>
                        </li>
                    </ul>
                }
            </div>
            <div className='md:flex hidden gap-4 items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size='icon' variant='outline' className='dark:border-zinc-400 rounded-full'>
                            {theme !== 'light' ?
                                <Moon className='size-5' /> :
                                <Sun className='size-5' />
                            }
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='dark:bg-zinc-700'>
                        <DropdownMenuItem className='flex gap-2' onClick={() => setTheme('light')}>
                            <Sun className='size-5' /> Light
                        </DropdownMenuItem>
                        <DropdownMenuItem className='flex gap-2' onClick={() => setTheme('dark')}>
                            <Moon className='size-5' /> Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem className='flex gap-2' onClick={() => setTheme('system')}>
                            <LaptopMinimal className='size-5' /> System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {!isLoaded ? <LoadingSpinner className='size-8' /> :
                    isSignedIn ?
                        <Button size='icon' variant='outline' className='p-0 rounded-full'>
                            <UserButton
                                afterSignOutUrl='/'
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: {
                                            height: '100%',
                                            width: '100%',
                                        },
                                    },
                                }} />
                        </Button>
                        :
                        <>
                            <Button
                                className='hover:scale-105 rounded-full'
                                variant='ghost'
                                onClick={() => navigate('/signin')}
                            >
                                Sign in
                            </Button>
                            <Button
                                className='hover:scale-105 rounded-full'
                                variant='secondary'
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </Button>
                        </>
                }
            </div>

            {/* mobile --------------- */}
            <div className='md:hidden block'>
                <MobileNavMenu />
            </div>
        </nav >
    )
}

export default Navbar