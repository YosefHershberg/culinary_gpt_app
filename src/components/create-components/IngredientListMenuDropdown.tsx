import { Button } from '../ui/button'
import { DiamondMinus, Menu, UserPlus } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '../ui/dropdown-menu'
import { FilterOptions } from '@/lib/enums'
import { useIngredientList } from '@/context/ingredient-list-context'
import { useState } from 'react'
import ClearIngredientsModal from '../modals/ClearIngredientsModal'
import { useUserData } from '@/context/user-data-context'

const IngredientListMenuDropdown: React.FC = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const { changeFilterOptions, filterOptions } = useIngredientList()
    const { deleteAllUserIngredients } = useUserData()

    const handleClick = () => {
        deleteAllUserIngredients()
        setIsOpenModal(false)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant='outline' size='icon'>
                                        <Menu />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Other Options</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className='flex justify-center'>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <div onClick={() => setIsOpenModal(true)}>
                        {/* ^^^ NOTE: The onClick is here because of some weird fucking strange behavior
                        that if the modal open was triggered from the menu item the page wouldn't be responsive AT ALL after the modal would close */}

                        <DropdownMenuItem>
                            <DiamondMinus className="mr-2 size-4" />
                            <span>Clear all ingredients</span>
                        </DropdownMenuItem>
                    </div>

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <UserPlus className="mr-2 size-4" />
                            <span>Filter by..</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup value={filterOptions} onValueChange={changeFilterOptions}>
                                    <DropdownMenuRadioItem value={FilterOptions.Alphabetical}>Name</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value={FilterOptions.Popularity}>Popularity</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value={FilterOptions.None}>None</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>

            {isOpenModal && <ClearIngredientsModal
                isOpen={isOpenModal}
                close={() => setIsOpenModal(false)}
                handleClick={handleClick}
            />}
        </>
    )
}

export default IngredientListMenuDropdown