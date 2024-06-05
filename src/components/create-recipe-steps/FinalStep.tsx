import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const FinalStep = () => {
  const [message, setMessage] = useState<string>('')

  const handleMessageChange = (value: string) => {
    setMessage(value)
  }

  return (
    <div className='flex-1 flex flex-col items-center'>
      <div className='max-w-[50rem] w-full flex-[1_1_0] overflow-y-auto sm:pt-5 pt-2'>
        <h1 className="text-3xl">Almost done..</h1>
        <div className="flex flex-col w-full items-center">
          <p className="text-2xl font-bold">Anything else to add?</p>
          <p className="mt-5 text-center">Write a message about anything else you would like th AI to know about!</p>
          <div className="mt-5">
            <Textarea
              value={message}
              placeholder="Type your prompt here."
              id="message-2"
              onChange={(e) => handleMessageChange(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Your prompt will be added to the recipe genaration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalStep