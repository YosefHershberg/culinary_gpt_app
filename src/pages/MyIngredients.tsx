import { Link, Route, Routes, NavLink } from "react-router-dom"
import ChooseIngredients from "@/components/create-recipe-steps/ChooseIngredients"
import ChooseDrinks from "@/components/create-cocktail/ChooseDrinks"
import Divider from "@/components/ui/Divider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Martini, Menu, Milk } from "lucide-react"

const MyIngredients: React.FC = () => {

// md:w-[calc(100vw-310px)]

  return (
    <main className="flex-1 flex flex-col w-screen p-5">
      <div className="h-full flex">
        
        <aside className="min-w-60 lg:block hidden ">
          <NavLink to='/my-ingredients/food' className={({ isActive }) =>
            `px-2 py-3 flex items-center gap-2 border-b-[1px] font-bold border-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700
            ${isActive && "bg-zinc-200 dark:bg-zinc-700"}
          `}>
            <Milk className="size-5" />
            Ingredients
          </NavLink>

          <NavLink to='/my-ingredients/drinks' className={({ isActive }) =>
            `px-2 py-3 flex items-center gap-2 border-b-[1px] font-bold border-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700
            ${isActive && "bg-zinc-200 dark:bg-zinc-700"}
          `}>
            <Martini className="size-5" />
            Drinks
          </NavLink>
        </aside>

        <Divider orientation='vertical' className='h-full mx-3 lg:block hidden' />

        <Routes>
          <Route path='food' element={<ChooseIngredients />} />
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
    <div className="absolute bottom-8 left-8 lg:hidden block">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-secondary size-[4rem] rounded-full flex items-center justify-center">
          <Menu className="size-8" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-2">
          <Link to='/my-ingredients/food'>
            <DropdownMenuItem className="font-semibold flex items-center gap-2">
              <Milk className="size-3" />
              Ingredients
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link to='/my-ingredients/drinks'>
            <DropdownMenuItem className="font-semibold flex items-center gap-2">
              <Martini className="size-3" />
              Drinks
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}