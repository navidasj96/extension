import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import { useLangRedux } from "~helper/getLanguageStates"
import { useStreamData } from "~helper/translateApi"
import { setChatConversation, setConvertation } from "~langRedux/LanguageSlice"

import QuestionTemplate from "./QuestionTemplate"
import ResponseTemplate from "./ResponseTemplate"
import SelectedTextTemplate from "./SelectedTextTemplate"

export default function ChatWrapperSection() {
  //using useLangRedux to use some states from our redux
  const {
    selectedTextTemplateOpen,
    converstaion,
    textFromHtml,
    chatText,
    command,
    fetching
  } = useLangRedux()
  const dispatch = useDispatch()
  //fetching current response coming from api
  const message = useStreamData(chatText, command)
  useEffect(() => {
    if (message && !fetching) {
      dispatch(setChatConversation(message))
      dispatch(setConvertation({ type: "res", text: message }))
      console.log("message to be saved is", message)
    }
    console.log("fetch is changed to", fetching)
  }, [fetching])
  return (
    <div className="flex h-full w-full pb-4 flex-col-reverse gap-4 space-y-5 overflow-y-auto overflow-x-hidden mt-5 overscroll-contain">
      {textFromHtml && textFromHtml.length > 0 && (
        <>
          {selectedTextTemplateOpen && (
            <ResponseTemplate text="what would you like to do with this?" />
          )}
          <SelectedTextTemplate text={textFromHtml} />
        </>
      )}
      {fetching && <ResponseTemplate text={message} />}
      {converstaion &&
        converstaion.length > 0 &&
        converstaion.toReversed().map((item, index) => {
          return (
            <>
              {item.type === "req" && (
                <QuestionTemplate key={item.text} text={item.text} />
              )}
              {item.type === "res" && index !== 0 && (
                <ResponseTemplate
                  key={item.text}
                  text={item.text}
                  latest={index === 0 ? true : false}
                />
              )}
              {item.type === "res" && index === 0 && !fetching && (
                <ResponseTemplate
                  key={item.text}
                  text={item.text}
                  latest={index === 0 ? true : false}
                />
              )}
            </>
          )
        })}
    </div>
  )
}
