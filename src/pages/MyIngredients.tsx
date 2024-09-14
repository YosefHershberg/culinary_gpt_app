import { Link, Route, Routes } from "react-router-dom"
import ChooseIngredients from "@/components/create-recipe-steps/ChooseIngredients"
import ChooseDrinks from "@/components/create-cocktail/ChooseDrinks"
import Divider from "@/components/ui/Divider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"

const MyIngredients: React.FC = () => {

  return (
    <main className="flex-1 flex flex-col w-screen p-5">
      <div className="h-full flex">
        <aside className="min-w-60 md:block hidden ">
          <Link to='/my-ingredients'>
            <div className="p-3 border-b-[1px] font-bold border-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700">Ingredients</div>
          </Link>
          <Link to='/my-ingredients/drinks'>
            <div className="p-3 border-b-[1px] font-bold border-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700">Drinks</div>
          </Link>
        </aside>

        <Divider orientation='vertical' className='h-full mx-3 md:block hidden' />

        <Routes>
          <Route index element={<ChooseIngredients />} />
          <Route path='drinks' element={<ChooseDrinks />} />
        </Routes>
      </div>


      <MobileNavIngredients />
    </main>
  )
}

export default MyIngredients

const MobileNavIngredients: React.FC = () => {

  return (
    <div className="absolute bottom-10 left-10 md:hidden block">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-secondary size-14 rounded-full flex items-center justify-center">
          <Menu size={30} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}