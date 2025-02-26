import { useTheme } from '@/context/theme-context';
import { useAuth } from '@/context/auth-context';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu';

import { Menu, Sun, Moon, LaptopMinimal, Beef, CookingPot, Plus, Martini } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserButton from './UserButton';

const MobileNavMenu: React.FC = () => {
    const { theme, setTheme } = useTheme()
    const { isSignedIn, isLoaded } = useAuth()

    return (
        <div className='flex items-center gap-4'>
            {!isLoaded ? <LoadingSpinner /> :
                isSignedIn &&
                <UserButton />
            }
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='icon'>
                        <Menu className='size-2/3' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[15rem] mx-2">
                    {!isSignedIn &&
                        <>
                            <DropdownMenuItem asChild>
                                <Link to='/signup'>
                                    Sign up
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to='/signin'>
                                    Log in
                                </Link>
                            </DropdownMenuItem>
                        </>
                    }
                    {isSignedIn &&
                        <>
                            <DropdownMenuItem asChild>
                                <Link to='/create-new-recipe'>
                                    <Plus className='mr-2 size-4' />
                                    Create New Recipe
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to='/create-new-cocktail'>
                                    <Martini className='mr-2 size-4' />
                                    Create New Cocktail
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to='/my-recipes'>
                                    <CookingPot className='mr-2 size-4' />
                                    My Recipes
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to='/my-ingredients/food'>
                                    <Beef className='mr-2 size-4' />
                                    My Ingredients
                                </Link>
                            </DropdownMenuItem>
                        </>
                    }
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            {theme === 'light' ? <Sun className='size-4 mr-2' /> : <Moon className='size-4 mr-2' />}
                            <span>Theme</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className='dark:bg-zinc-700'>
                                <DropdownMenuItem onClick={() => setTheme('dark')}>
                                    <Moon className='mr-2 size-4' />
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme('light')}>
                                    <Sun className='mr-2 size-4' />
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme('system')}>
                                    <LaptopMinimal className='mr-2 size-4' />
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MobileNavMenu