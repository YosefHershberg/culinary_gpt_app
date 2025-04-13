import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FilterRecipesOptions } from '@/lib/enums';
import { Button } from "../ui/button";
import { Filter } from "lucide-react";

type FilterOptionsDropdownProps = {
    handleFilterChange: (value: FilterRecipesOptions) => void,
    currentFilter: FilterRecipesOptions
}

const FilterOptionsDropdown: React.FC<FilterOptionsDropdownProps> = ({ handleFilterChange, currentFilter }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='outline'
                    className="flex items-center gap-2"
                >
                    Filter
                    <Filter className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by..</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={currentFilter} onValueChange={(val) => handleFilterChange(val as FilterRecipesOptions)}>
                    <DropdownMenuRadioItem value="recipes">Recipes</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="cocktails">Cocktails</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default FilterOptionsDropdown