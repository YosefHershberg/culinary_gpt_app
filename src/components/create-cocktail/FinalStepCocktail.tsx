import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCreateCocktail } from "@/context/create-cocktail-context"

const FinalStep: React.FC = () => {
  const { prompt, handlePromptChange, handleSubmit } = useCreateCocktail()

  return (
    <div className='flex-1 flex flex-col items-center'>
      <div className='max-w-[50rem] w-full flex-[1_1_0] overflow-y-auto sm:pt-5 pt-2'>
        <h1 className="text-3xl mb-8">Almost done..</h1>
        <div className="flex flex-col w-full items-center">
          <p className="text-2xl font-bold">Anything else to add?</p>
          <p className="mt-7 text-center">Write a message about anything else you would like th AI to know about!</p>
          <div className="mt-7">
            <Textarea
              className="dark:bg-zinc-600 bg-zinc-100"
              value={prompt}
              placeholder="Type your prompt here."
              id="message-2"
              onChange={(e) => handlePromptChange(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Your prompt will be added to the recipe generation.
            </p>
          </div>
          <Button
            onClick={handleSubmit}
            variant='secondary'
            className="bg-violet-500 mt-10 h-12 w-[10rem] rounded-full text-md hover:bg-violet-100 hover:text-violet-900 hover:border-violet-800 hover:border hover:scale-105"
          >
            Create Recipe!
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FinalStep