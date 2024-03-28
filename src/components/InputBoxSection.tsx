import React from "react"
import { FiPlusCircle } from "react-icons/fi"
import { GrHistory } from "react-icons/gr"

import {
  setChatHistoryOpen,
  setConversationFromHistory,
  setDisplayedChatId
} from "~langRedux/LanguageSlice"
import { useAppDispatch } from "~langRedux/store"

import WriteAboutTextField from "./WriteAboutTextField"

export default function InputBoxSection() {
  const dispatch = useAppDispatch()

  return (
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
  )
}
