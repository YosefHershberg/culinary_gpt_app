import { useState } from "react"
import { useCreateRecipe } from "@/context/create-recipe-context"

import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const textareaSchema = z.string().max(99, { message: 'Max 99 characters' })

const FinalStep: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('')
  const { handleSubmit } = useCreateRecipe()

  return (
    <div className='flex-1 flex flex-col items-center'>
      <div className='max-w-[50rem] w-full flex-[1_1_0] overflow-y-auto sm:pt-5 pt-2'>
        <h1 className="text-3xl mb-8">Almost done..</h1>
        <div className="flex flex-col w-full items-center">
          <p className="text-2xl font-bold">Message to the chef?</p>
          <p className="mt-7 text-center">Such as dietary restriction, allergies, etc.</p>
          <div className="mt-7">
            <Textarea
              className="dark:bg-zinc-600 bg-zinc-100"
              value={prompt}
              placeholder="Type your prompt here."
              id="message-2"
              onChange={(e) => setPrompt(e.target.value)}
            />

            {!textareaSchema.safeParse(prompt).success && (
              <span className="text-sm text-muted-foreground text-red-500">
                {textareaSchema.safeParse(prompt).error?.errors[0].message}
              </span>
            )}

            <p className="text-sm text-muted-foreground mt-2">
              Your prompt will be added to the recipe generation.
            </p>
          </div>
          <Button
            onClick={() => handleSubmit(prompt)}
            variant='secondary'
            className="bg-amber-800 mt-10 h-12 w-[10rem] rounded-full text-md hover:bg-amber-100 hover:text-amber-900 hover:border-amber-800 hover:border hover:scale-105"
          >
            Create Recipe!
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FinalStep