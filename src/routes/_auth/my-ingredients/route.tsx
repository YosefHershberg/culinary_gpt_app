import { useLayoutEffect } from 'react';
import { createFileRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'

import Divider from '@/components/ui/Divider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Martini, Menu, Milk } from 'lucide-react';

export const Route = createFileRoute('/_auth/my-ingredients')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (window.location.pathname === '/my-ingredients') {
      navigate({ to: '/my-ingredients/food' });
    }
  }, [])

  return (
    <main className="flex-1 flex flex-col justify-center items-center w-screen">
      <div className="h-full flex flex-1 max-w-[95vw] w-full">
        <aside className="min-w-60 lg:block hidden">
          <Link
            to="/my-ingredients/food"
            className="px-2 py-3 flex items-center gap-2 border-b-[1px] font-bold border-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            activeProps={{ className: "bg-zinc-200 dark:bg-zinc-700" }}
          >
            <Milk className="size-5" />
            Ingredients
          </Link>

          <Link
            to="/my-ingredients/drinks"
            className="px-2 py-3 flex items-center gap-2 border-b-[1px] font-bold border-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            activeProps={{ className: "bg-zinc-200 dark:bg-zinc-700" }}
          >
            <Martini className="size-5" />
            Drinks
          </Link>
        </aside>

        <Divider orientation="vertical" className="h-full mx-3 lg:block hidden" />

        <Outlet />
      </div>

      <MobileNavIngredients />
    </main>
  );
}

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
