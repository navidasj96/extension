"use client"

import { Drawer } from "antd"
import React, { useEffect, useState } from "react"

import { useLangRedux } from "~helper/getLanguageStates"
import {
  getLocalStorageChats,
  SetStorageBegoreUnmount
} from "~helper/getLocalStorage"
import {
  setChatHistoryClose,
  setConversationFromHistory,
  setConvertation,
  setDisplayedChatId,
  type Conversation
} from "~langRedux/LanguageSlice"
import { useAppDispatch } from "~langRedux/store"

export default function ChatHistory() {
  const { converstaion, chatHistoryOpen } = useLangRedux()
  const [locaChats, setLocatChats] = useState([])
  console.log("locaChats", locaChats)
  useEffect(() => {
    SetStorageBegoreUnmount()
  }, [])
  const dispatch = useAppDispatch()
  useEffect(() => {
    const storageChats = getLocalStorageChats()
    console.log("storageChats", storageChats)

    // @ts_ignore
    setLocatChats(storageChats)
    // console.log("storageChats", storageChats)
  }, [])

  const onClose = () => {
    dispatch(setChatHistoryClose())
  }

  return (
    <>
      <Drawer
        height="700"
        className="rounded-3xl"
        title="Conversation History"
        placement="bottom"
        onClose={onClose}
        open={chatHistoryOpen}>
        <div className="h-[900px] w-full  flex flex-col">
          {locaChats &&
            locaChats.length > 0 &&
            locaChats.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    // @ts_ignore
                    dispatch(setDisplayedChatId(item.id))
                    dispatch(setConversationFromHistory(item.conversationChats))
                    onClose()
                  }}
                  className="h-[104px] flex flex-col w-full bg-white rounded-xl cursor-pointer hover:bg-[#F4F4F5]">
                  <p className="font-[600]">
                    chat number {item.id} {item.id === 1000 && <p> current</p>}
                  </p>
                </div>
              )
            })}
        </div>
      </Drawer>
    </>
  )
}
