import { Box, Stack } from "@mui/material"
import { useIsFetching } from "@tanstack/react-query"
import { Drawer } from "antd"
import { useEffect, useState } from "react"
import { FiPlusCircle } from "react-icons/fi"
import { GrHistory } from "react-icons/gr"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { useLangRedux } from "~helper/getLanguageStates"
import { setLocalStorageChats } from "~helper/getLocalStorage"
import useGetWindowsWidth from "~helper/use-screenwidth"
import {
  setSelectedTextTemplateOpen,
  setTextFromHtml
} from "~langRedux/LanguageSlice"
import { useAppDispatch, useAppSelector } from "~langRedux/store"

import ChatHistory from "./ChatHistory"
import ChatWrapperSection from "./ChatWrapperSection"
import InputBoxSection from "./InputBoxSection"
import MainNavbar from "./MainNavbar"

const storage = new Storage({ area: "local" })

export function Main({ name = "Extension" }) {
  //handle history drawer
  const [openHistory, setOpenHistory] = useState(false)
  const dispatch = useAppDispatch()

  //get some neccessary states with useLang hook
  const {
    converstaion,

    displayedChatId
  } = useLangRedux()

  //set width of the container
  const { screenWidth } = useGetWindowsWidth()

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
      <MainNavbar />
      <Box style={{ width: `${containerWidth}px` }} className=" h-screen">
        <div className="flex flex-col w-full h-full">
          {/* chat wrapper */}
          <div className="relative h-[70%]   w-full   bg-[#F4F4F5] ">
            <ChatWrapperSection />
          </div>

          {/* chat wrapper */}
          {/* input box */}

          <InputBoxSection />
          {/* input box */}
        </div>
        <ChatHistory />
      </Box>
    </div>
  )
}
