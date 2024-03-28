import { Box, Stack } from "@mui/material"
import { useIsFetching } from "@tanstack/react-query"
import { Drawer } from "antd"
import { useEffect, useState } from "react"
import { FiPlusCircle } from "react-icons/fi"
import { GrHistory } from "react-icons/gr"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { useLangRedux } from "~helper/getLanguageStates"
import {
  setLocalStorageChats,
  SetStorageBegoreUnmount
} from "~helper/getLocalStorage"
import { useStreamData } from "~helper/translateApi"
import useGetWindowsWidth from "~helper/use-screenwidth"
import {
  setChatHistoryOpen,
  setChatText,
  setConversationFromHistory,
  setConvertation,
  setDisplayedChatId,
  setSelectedTextTemplateOpen,
  setTextFromHtml
} from "~langRedux/LanguageSlice"
import { useAppDispatch, useAppSelector } from "~langRedux/store"

import ChatHistory from "./ChatHistory"
import HomeLayoutWrapper from "./HomeLayoutWraper"
import MobileNavbar from "./MobileNavbar"
import QuestionTemplate from "./QuestionTemplate"
import ResponseTemplate from "./ResponseTemplate"
import SelectedTextTemplate from "./SelectedTextTemplate"
import WaitingTemplate from "./WaitngTemplate"
import WriteAboutTextField from "./WriteAboutTextField"

const storage = new Storage({ area: "local" })

export function Main({ name = "Extension" }) {
  //handle history drawer
  const [openHistory, setOpenHistory] = useState(false)
  const dispatch = useAppDispatch()

  //get some neccessary states with useLang hook
  const {
    selectedTextTemplateOpen,
    converstaion,
    textFromHtml,
    displayedChatId,
    chatText,
    command,
    fetching
  } = useLangRedux()
  const message = useStreamData(chatText, command)

  //set width of the container
  const { screenWidth } = useGetWindowsWidth()
  const isFetching = useIsFetching()

  const [containerWidth, setContainerWidth] = useState(screenWidth)

  useEffect(() => {
    setContainerWidth(screenWidth - 61)
    // console.log(screenWidth - 65);
  }, [screenWidth])

  //handling selected text from the web page

  const [selectedText, setSelectedText] = useState("")

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.selectedText) {
        setSelectedText(message.selectedText)
        dispatch(setTextFromHtml(message.selectedText))
      }
    })
  }, [])

  //handle selecting text
  useEffect(() => {
    if (selectedText.length > 0) {
      dispatch(setSelectedTextTemplateOpen(true))
    }
  }, [selectedText])

  //handle saving conversation to local storage
  useEffect(() => {
    if (converstaion.length > 0) {
      setLocalStorageChats({
        conversationChats: converstaion,
        current: displayedChatId === 1000 ? true : false,
        convId: displayedChatId
      })
    }
  }, [converstaion])

  return (
    <div className="flex rtl">
      <Box className="w-[61px] h-screen border bg-[#ECECEE]">
        <Box className="fixed flex flex-col w-full items-center justify-center">
          <div className="w-full  flex flex-col justify-center h-full  ">
            <MobileNavbar />
          </div>
        </Box>
      </Box>
      <Box style={{ width: `${containerWidth}px` }} className=" h-screen">
        <div className="flex flex-col w-full h-full">
          {/* chat wrapper */}
          <div className="relative h-[70%]   w-full   bg-[#F4F4F5] ">
            <div className="flex h-full w-full pb-4 flex-col-reverse gap-4 space-y-5 overflow-y-auto overflow-x-hidden mt-5 overscroll-contain">
              {/* {chatReply && !isFetching && (
                <ResponseTemplate text={chatReply} />
              )} */}
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
          </div>

          {/* chat wrapper */}
          {/* input box */}
          <div className="flex flex-col w-full h-[30%] bg-[#F4F4F5]">
            <div className="w-[90%] h-[50px]  mt-5 mx-auto flex  flex-row- items-center">
              <span
                className="  cursor-pointer text-[20px] hover: bg-[#F4F4F5]"
                onClick={() => {
                  dispatch(setConversationFromHistory([]))
                  dispatch(setDisplayedChatId(1000))
                }}>
                <FiPlusCircle />
              </span>
              <span
                className="mr-5 cursor-pointer text-[20px] hover: bg-[#F4F4F5]"
                onClick={() => dispatch(setChatHistoryOpen())}>
                <GrHistory />
              </span>
            </div>
            <div className="flex items-center justify-center relative w-[100%] py-[10px] px-[14px] z-[501] mt-auto  ">
              <WriteAboutTextField />
            </div>
          </div>
          {/* input box */}
        </div>
        <ChatHistory />
      </Box>
    </div>
  )
}
