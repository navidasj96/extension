import { useEffect, useState } from "react"

import { useLangRedux } from "./getLanguageStates"

function useType({ text }: { text: string }) {
  const { converstaion } = useLangRedux()
  const [typedWords, settypedWords] = useState("")

  const simulateTypeing = async (InputText: string) => {
    const textArray = InputText.split(" ")

    for (const word of textArray) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          settypedWords((prev) => prev + word + " ") // Replace with your desired action
          resolve()
        }, 50) // Adjust the delay as needed
      })
    }
  }
  useEffect(() => {
    const excequte = async (text: string) => {
      await simulateTypeing(text)
    }
    excequte(text)
  }, [text])
  return { typedWords }
}

export default useType
