import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Menu, Sun, Moon, LaptopMinimal, Beef, CookingPot, Plus } from 'lucide-react';
import { useTheme } from '@/context-providers/theme-provider';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context-providers/auth-provider';
import { UserButton } from '@clerk/clerk-react';
import LoadingSpinner from '@/components/ui/LaodingSpinner';

const MobileNavMenu = () => {
    const { theme, setTheme } = useTheme()
    const navigate = useNavigate()
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
                            <DropdownMenuItem onClick={() => navigate('/signup')}>
                                Sign in
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/signin')}>
                                Log in
                            </DropdownMenuItem>
                        </>
                    }
                    {isSignedIn &&
                        <>
                            <DropdownMenuItem onClick={() => navigate('/create-new-recipe')}>
                                <Plus className='mr-2 size-4' />
                                Create New Recipe
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/my-recipes')}>
                                <CookingPot className='mr-2 size-4' />
                                My Recipes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/my-ingredients')}>
                                <Beef className='mr-2 size-4' />
                                My Ingredients
                            </DropdownMenuItem>
                        </>
                    }
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            {theme === 'light' ? <Sun className='size-4 mr-2' /> : <Moon className='size-4 mr-2' />}
                            <span>Theme</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
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