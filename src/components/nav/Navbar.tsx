import { useState, useLayoutEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useUserData } from '@/context/user-data-context'
import { useAuth } from '@/context/auth-context'

import MobileNavMenu from '@/components/nav/MobileNavMenu'
import Logo from '@/components/Logo'

import ThemeButton from './ThemeButton'
import AuthNavButtons from './AuthNavButtons'

const Navbar: React.FC = () => {
    const { isSignedIn } = useAuth()
    const { userIngredients } = useUserData()

    const [isAnimating, setIsAnimating] = useState(false);

    useLayoutEffect(() => {
        if (userIngredients.length > 0) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 200);
            return () => clearTimeout(timer);
        }
    }, [userIngredients]);

    return (
        <nav className='flex min-h-16 w-full sm:px-8 px-4 items-center justify-between'>
            <div className='flex items-center gap-4'>
                <a href="/">
                    <Logo />
                </a>
                {isSignedIn &&
                    <ul className='lg:flex hidden items-center md:gap-5 gap-3 ml-7 mr-3'>
                        <li>
                            <NavLink
                                to='/create-new-recipe'
                                className='bg-orange text-white h-8 px-3 text-sm rounded-lg inline-flex items-center justify-center z-10 transition-all duration-200 hover:scale-105 whitespace-nowrap'
                            >
                                Create New Recipe
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/create-new-cocktail'
                                className='bg-emerald-400 text-white h-8 px-3 text-sm rounded-lg inline-flex items-center justify-center z-10 transition-all duration-200 hover:scale-105 whitespace-nowrap'
                            >
                                Create A Cocktail
                            </NavLink>
                        </li>
                        <li className='size-fit relative'>
                            <NavLink
                                to='/my-ingredients/food'
                                className={({ isActive }) =>
                                    `${isAnimating ? 'text-primary transition-colors duration-300 scale-105' : ""}
                                    h-8 px-3 text-sm rounded-lg inline-flex items-center justify-center z-10 font-bold text-primary/90 hover:text-primary transition-all duration-200 hover:scale-105 whitespace-nowrap
                                    ${isActive && "bg-zinc-200 dark:bg-zinc-700"}`
                                }
                            >
                                My Ingredients
                            </NavLink>
                            {userIngredients.length > 0 &&
                                <span className='absolute text-secondary p-1 min-w-5 h-5 rounded-full bg-red-400 flex justify-center items-center top-[-.5rem] right-[-0.5rem] text-[0.7rem]'>
                                    {userIngredients.length > 100 ? '99+' : userIngredients.length}
                                </span>
                            }
                        </li>
                        <li>
                            <NavLink
                                to="/my-recipes"
                                className={({ isActive }) =>
                                    `h-8 px-3 text-sm rounded-lg inline-flex items-center justify-center z-10 font-bold text-primary/90 hover:text-primary transition-all duration-200 hover:scale-105 whitespace-nowrap
                                    ${isActive && "bg-zinc-200 dark:bg-zinc-700 "}`
                                }
                            >
                                My Recipes
                            </NavLink>
                        </li>
                    </ul>
                }
            </div>
            <div className='lg:flex hidden gap-4 items-center'>
                <ThemeButton />
                <AuthNavButtons />
            </div>

            {/* mobile --------------- */}
            <div className='lg:hidden block'>
                <MobileNavMenu />
            </div>
        </nav >
    )
}

export default Navbar