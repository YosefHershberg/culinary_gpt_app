import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/context/theme-context'
import { LaptopMinimal, Moon, Sun } from 'lucide-react'
import { Button } from '../ui/button'


const ThemeButton: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
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
        <DropdownMenuLabel className='flex justify-center'>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
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
  )
}

export default ThemeButton