import React from "react"

import { useLangRedux } from "~helper/getLanguageStates"

import QuestionTemplate from "./QuestionTemplate"
import ResponseTemplate from "./ResponseTemplate"
import SelectedTextTemplate from "./SelectedTextTemplate"
import WaitingTemplate from "./WaitngTemplate"

interface Props {
  chats?: { type: "res" | "req"; text: string }[]
  isFetching?: any
}

export default function ChatSection({ chats, isFetching }: Props) {
  const { selectedTextTemplateOpen, converstaion, textFromHtml } =
    useLangRedux()
  return (
    <div className="relative h-[70%]   w-full   bg-[#F4F4F5] ">
      {chats && (
        <div className="flex h-full w-full pb-4 flex-col-reverse gap-4 space-y-5 overflow-y-auto overflow-x-hidden mt-5 overscroll-contain">
          {/* {chatReply && !isFetching && (
        <ResponseTemplate text={chatReply} />
      )} */}
          {!!isFetching && <WaitingTemplate />}
          {textFromHtml && textFromHtml.length > 0 && (
            <>
              {selectedTextTemplateOpen && (
                <ResponseTemplate text="what would you like to do with this?" />
              )}
              <SelectedTextTemplate text={textFromHtml} />
            </>
          )}
          {chats.toReversed().map((item) => {
            return (
              <>
                {item.type === "req" && (
                  <QuestionTemplate key={item.text} text={item.text} />
                )}
                {item.type === "res" && (
                  <ResponseTemplate key={item.text} text={item.text} />
                )}
              </>
            )
          })}

          {/* <QuestionTemplate text="what is that" /> */}
        </div>
      )}
    </div>
  )
}
