import { useTheme } from '@/context/theme-context';
import { useAuth } from '@/context/auth-context';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/clerk-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu';

import { Menu, Sun, Moon, LaptopMinimal, Beef, CookingPot, Plus, Martini } from 'lucide-react';

const MobileNavMenu: React.FC = () => {
    const { theme, setTheme } = useTheme()
    const { isSignedIn, isLoaded } = useAuth()

    return (
        <div className='flex items-center gap-4'>
            {!isLoaded ? <LoadingSpinner /> :
                isSignedIn &&
                <Button size='icon' variant='outline' className='p-0 rounded-full'>
                    <UserButton appearance={{
                        elements: {
                            userButtonAvatarBox: {
                                height: '100%',
                                width: '100%',
                            },
                        },
                    }} />
                </Button>
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
                                <a href='/signup'>
                                    Sign up
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href='/signin'>
                                    Log in
                                </a>
                            </DropdownMenuItem>
                        </>
                    }
                    {isSignedIn &&
                        <>
                            <DropdownMenuItem asChild>
                                <a href='/create-new-recipe'>
                                    <Plus className='mr-2 size-4' />
                                    Create New Recipe
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href='/create-new-cocktail'>
                                    <Martini className='mr-2 size-4' />
                                    Create New Cocktail
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href='/my-recipes'>
                                    <CookingPot className='mr-2 size-4' />
                                    My Recipes
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href='/my-ingredients'>
                                    <Beef className='mr-2 size-4' />
                                    My Ingredients
                                </a>
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