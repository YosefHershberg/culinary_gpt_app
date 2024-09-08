import { z } from "zod";

import { useUserData } from "@/context/user-data-provider";
import { useCreateRecipe } from "@/context/create-recipe-provider";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { KitchenUtils } from "@/lib/types";

const ChooseAdditional: React.FC = () => {
    const { kitchenUtils: kitchenUtils, addKitchenUtil: addKitchenUtil, removeKitchenUtil } = useUserData()
    const { selectedTime,
        numOfPeople,
        handleTimeChange,
        handleMealSelected,
        handleNumOfPeopleChange,
    } = useCreateRecipe()

    const handleKitchenUtilsSelected = (key: string) => {
        //@ts-ignore
        if (kitchenUtils[key] === false) {
            return addKitchenUtil(key)
        } else {
            return removeKitchenUtil(key)
        }
    }

    return (
        <div className='flex-1 flex flex-col items-center'>
            <div className='max-w-[50rem] w-full flex-[1_1_0] overflow-y-auto sm:p-5 p-2'>
                <div className='flex md:flex-row flex-col justify-between items-center'>
                    <p className='font-bold text-lg md:text-none mb-6 md:mb-0'>What meal you want to cook?</p>
                    <Select onValueChange={handleMealSelected}>
                        <SelectTrigger className="max-w-[20rem] dark:bg-zinc-700">
                            <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent className='dark:bg-zinc-700'>
                            <SelectItem value="breakfast">Breakfast</SelectItem>
                            <SelectItem value="lunch">Lunch</SelectItem>
                            <SelectItem value="dinner">Dinner</SelectItem>
                            <SelectItem value="snack">Snack</SelectItem>
                            <SelectItem value="dessert">Dessert</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator className='my-6' />

                <div className='flex md:flex-row flex-col justify-between items-center'>
                    <p className='font-bold text-lg md:text-none mb-6 md:mb-0 text-center'>How many people are you cooking for?</p>
                    <div className="relative flex flex-col md:items-end w-full items-center">
                        <Input
                            className="max-w-[20rem]"
                            type='number'
                            value={numOfPeople.toString()}
                            onChange={(e) => handleNumOfPeopleChange(Number(e.target.value))}
                        />
                        {!inputSchema.safeParse(numOfPeople).success && (
                            <p className='text-red-500 text-sm absolute bottom-[-1.3rem] right-0'>
                                {inputSchema.safeParse(numOfPeople).error?.errors[0].message}
                            </p>
                        )}
                    </div>
                </div>

                <Separator className='my-6' />

                <div className='flex md:flex-row flex-col justify-between md:items-start items-center'>
                    <p className='font-bold text-lg md:text-none text-center mb-6 md:mb-0'>Select the kitchen utensils you have.</p>
                    <div className="grid grid-cols-2 gap-3 sm:gap-x-10">
                        {kitchenUtils && Object.keys(kitchenUtils).map((key) => (
                            <div key={key} className="flex items-center gap-3 start">
                                <Switch
                                    id={key}
                                    checked={kitchenUtils[key as keyof KitchenUtils]} //TODO: Damn! ugly. but it works
                                    onCheckedChange={() => handleKitchenUtilsSelected(key)}
                                />
                                <Label htmlFor={key}>{key}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className='my-6' />

                <div className='flex md:flex-row flex-col justify-between items-center md:items-start'>
                    <p className='font-bold text-lg md:text-none mb-6 md:mb-0'>How much time do you have?</p>
                    <div className="w-[25rem] max-w-[80vw] flex flex-col items-center">
                        <Slider
                            className="h-7"
                            defaultValue={[selectedTime - 5]}
                            max={120}
                            step={10}
                            onValueChange={handleTimeChange}
                        />
                        <p>{selectedTime > 120 ? '120+' : selectedTime} {' minutes'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseAdditional

const inputSchema = z.number().int().positive().min(1).max(99)
