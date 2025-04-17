import { useState, useEffect } from 'react'
import { useUserData } from '@/context/user-data-context'
import { useAuth } from '@/context/auth-context'

import { Link } from '@tanstack/react-router'
import MobileNavMenu from '@/components/nav/MobileNavMenu'
import Logo from '@/components/Logo'

import ThemeButton from './ThemeButton'
import AuthNavButtons from './AuthNavButtons'

const Navbar: React.FC = () => {
    const { isSignedIn } = useAuth()

    return (
        <nav className='flex min-h-16 w-full sm:px-8 px-4 items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Link to="/">
                    <Logo />
                </Link>
                {isSignedIn && <IsSignedInNav />}
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

const IsSignedInNav: React.FC = () => {
    const { userIngredients } = useUserData()
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (userIngredients.length > 0) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 200);
            return () => clearTimeout(timer);
        }

        //we r watching the length because the reference to userIngredients is created twice. once on cache change (optimistically) and once again when on refetch (on invalidate query)
    }, [userIngredients.length]);

    return (
        <ul className='lg:flex hidden items-center md:gap-5 gap-3 ml-7 mr-3'>
            <li>
                <Link
                    to='/create-recipe'
                    className='bg-orange text-white h-8 px-3 text-sm rounded-lg inline-flex items-center justify-center z-10 transition-all duration-200 hover:scale-105 whitespace-nowrap'
                >
                    Create New Recipe
                </Link>
            </li>
            <li>
                <Link
                    to='/create-cocktail'
                    className='bg-emerald-400 text-white h-8 px-3 text-sm rounded-lg inline-flex items-center justify-center z-10 transition-all duration-200 hover:scale-105 whitespace-nowrap'
                >
                    Create A Cocktail
                </Link>
            </li>
            <li className='size-fit relative'>
                <Link
                    to='/my-ingredients/food'
                    className={`${isAnimating ? 'text-primary transition-colors duration-300 scale-105' : ""}
                    h-8 px-3 text-sm rounded-lg inline-flex items-center justify-center z-10 font-bold text-primary/90 hover:text-primary transition-all duration-200 hover:scale-105 whitespace-nowrap`}
                    activeProps={{ className: "bg-zinc-200 dark:bg-zinc-700" }}
                >
                    My Ingredients
                </Link>
                {userIngredients.length > 0 &&
                    <span className='absolute text-secondary p-1 min-w-5 h-5 rounded-full bg-red-400 flex justify-center items-center top-[-.5rem] right-[-0.5rem] text-[0.7rem]'>
                        {userIngredients.length > 100 ? '99+' : userIngredients.length}
                    </span>
                }
            </li>
            <li>
                <Link
                    to="/my-recipes"
                    className='h-8 px-3 text-sm rounded-lg inline-flex items-center justify-center z-10 font-bold text-primary/90 hover:text-primary transition-all duration-200 hover:scale-105 whitespace-nowrap'
                    activeProps={{ className: "bg-zinc-200 dark:bg-zinc-700" }}
                >
                    My Recipes
                </Link>
            </li>
        </ul>
    )
}


