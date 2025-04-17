import { useFormContext } from "react-hook-form"
import { useCreateRecipe } from "@/context/create-recipe-context"
import type { RecipeFormValues } from "@/context/create-recipe-context"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const FinalStep: React.FC = () => {
  const { onSubmit } = useCreateRecipe()
  const { register, formState: { errors }, handleSubmit } = useFormContext<RecipeFormValues>()

  return (
    <div className='flex-1 flex flex-col items-center'>
      <div className='max-w-[50rem] w-full flex-[1_1_0] overflow-y-auto sm:pt-5 pt-2'>
        <h1 className="text-3xl mb-8">Almost done..</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center">
          <p className="text-2xl font-bold">Message to the chef?</p>
          <p className="mt-7 text-center">Such as dietary restriction, allergies, etc.</p>
          <div className="mt-7 w-full max-w-lg">
            <Textarea
              className="dark:bg-zinc-600 bg-zinc-100"
              placeholder="Type your prompt here."
              id="message-2"
              {...register('prompt')}
            />
            {errors.prompt && (
              <span className="text-sm text-muted-foreground text-red-500">
                {errors.prompt.message as string}
              </span>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Your prompt will be added to the recipe generation.
            </p>
          </div>
          <Button
            type="submit"
            variant='secondary'
            className="bg-amber-800 mt-10 h-12 w-[10rem] rounded-full text-md hover:bg-amber-100 hover:text-amber-900 hover:border-amber-800 hover:border hover:scale-105"
          >
            Create Recipe!
          </Button>
        </form>
      </div>
    </div>
  )
}

export default FinalStep