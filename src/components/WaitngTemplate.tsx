import React, { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"

import { useLangRedux } from "~helper/getLanguageStates"

export default function WaitingTemplate() {
  // const [typedWords, settypedWords] = useState("")
  // const { chatReply } = useLangRedux()
  // useEffect(() => {
  //   settypedWords("")
  // }, [chatReply])
  // const simulateTypeing = async (Inputtext: string) => {
  //   // settypedWords("")
  //   const textArray = Inputtext.split(" ")
  //   for (const word of textArray) {
  //     await new Promise<void>((resolve) => {
  //       setTimeout(() => {
  //         settypedWords((prev) => prev + word + " ") // Replace with your desired action
  //         resolve()
  //       }, 50) // Adjust the delay as needed
  //     })
  //   }
  // }
  // useEffect(() => {
  //   const simutalte = async () => {
  //     await simulateTypeing(chatReply)
  //   }
  //   simutalte()
  // }, [chatReply])

  // const [showToolbar , setShowToolbar] = useState(false)
  return (
    <div className="w-[100%] flex items-center flex-row gap-[24px] justify-between box-border ltr">
      {/* question text container */}
      <div
        className="ml-5 bg-white py-5 px-2 font-[700]  cursor-pointer  text-[#4E5257] items-end whitespace-pre-wrap inline-flex relative max-w-[100%] min-w-[40px] hover:shadow-md transition-all duration-200 flex-col "
        style={{ borderRadius: "20px 4px 20px 4px" }}>
        <BeatLoader color="#36d7b7" size={8} />
      </div>
      {/* question text container */}

      {/* toolbox popover */}
      <div className="left-0 pr-[8px] absolute z-[500] "></div>
      {/* toolbox popover */}
    </div>
  )
}
