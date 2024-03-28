import { Popover } from "antd"
import React, { useEffect, useState } from "react"
import { FaBookmark, FaCopy } from "react-icons/fa"
import { IoPencilSharp } from "react-icons/io5"
import { MdFormatQuote } from "react-icons/md"

import { useLangRedux } from "~helper/getLanguageStates"
import { extractCodeBlocks } from "~helper/TextExtractore"

import CodeTextTemplate from "./CodeTextTemplate"
import NormalTextTemplate from "./NormalTextTemplate"

export default function ResponseTemplate({
  text,
  latest
}: {
  text: string
  latest?: boolean
}) {
  const { converstaion } = useLangRedux()
  const [typedWords, settypedWords] = useState("")
  const [codeText, setCodeText] = useState([])
  const [totalResponseText, setTotalResponseText] = useState([])
  const simulateTypeing = async (InputText: string) => {
    const textArray = InputText.split(" ")
    const codeText = InputText.split("```")
    console.log("codeText", codeText)

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
    settypedWords("")
    const excecuteType = async (text: string) => {
      await simulateTypeing(text)
    }
    if (latest) {
      excecuteType(text)
    } else {
      settypedWords(text)
    }
  }, [converstaion])

  useEffect(() => {
    const code = extractCodeBlocks(text)
    const split = text.split("```")
    setCodeText(code)
    setTotalResponseText(split)
  }, [converstaion])

  const toolbar = (
    <div className="h-[20px] bg-white rounded-lg inline-flex flex-row items-center font-[14px] w-[100px] justify-between  ">
      <MdFormatQuote />
      <FaCopy />
      <FaBookmark />
      <IoPencilSharp />
    </div>
  )
  return (
    <div className="w-[100%] flex items-center flex-row gap-[24px] justify-between box-border ltr">
      {/* question text container */}
      <Popover placement="top" content={toolbar}>
        <div
          className="ml-5 bg-white py-5 px-2 font-[600]  cursor-pointer  text-[#4E5257] items-end whitespace-pre-wrap inline-flex relative max-w-[90%] min-w-[40px] hover:shadow-md transition-all duration-200 flex-col "
          style={{ borderRadius: "20px 4px 20px 4px" }}>
          {text}
        </div>

        {/* <div
          className="flex flex-col"
          style={{ borderRadius: "20px 4px 20px 4px" }}>
          {totalResponseText.map((item) => {
            return (
              <>
                {codeText.includes(item) && (
                  <CodeTextTemplate text={item} last={latest} />
                )}
                {!codeText.includes(item) && (
                  <NormalTextTemplate text={item} last={latest} />
                )}
              </>
            )
          })}
        </div> */}
        {/* question text container */}
      </Popover>

      {/* toolbox popover */}
      {/* toolbox popover */}
    </div>
  )
}
