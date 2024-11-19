import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowDownWideNarrow } from "lucide-react";
import { SortOptions } from "@/hooks/componentHooks/useSortRecipes";

type SortOptionsDropdownProps = {
    handleSortChange: (value: SortOptions) => void,
    currentSort: SortOptions
}

const SortOptionsDropdown: React.FC<SortOptionsDropdownProps> = ({ handleSortChange, currentSort }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='outline'
                    className="flex items-center gap-2"
                >
                    <span className="text-md">Sort</span>
                    <ArrowDownWideNarrow className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sort by..</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={currentSort} onValueChange={(val) => handleSortChange(val as SortOptions)}>
                    <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="a-z">A - Z</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="z-a">Z - A</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default SortOptionsDropdown