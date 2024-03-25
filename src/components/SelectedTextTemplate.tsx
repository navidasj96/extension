import React, { useState } from "react"
import { IoCloseCircleOutline } from "react-icons/io5"

import { useLangRedux } from "~helper/getLanguageStates"
import {
  setSelectedTextTemplateOpen,
  setTextFromHtml
} from "~langRedux/LanguageSlice"
import { useAppDispatch } from "~langRedux/store"

export default function SelectedTextTemplate({ text }: { text: string }) {
  const [open, setOpen] = useState(true)
  const { selectedTextTemplateOpen } = useLangRedux()

  const dispatch = useAppDispatch()

  // const [showToolbar , setShowToolbar] = useState(false)
  return (
    <div
      className={`w-[100%] flex items-center flex-row gap-[24px] justify-between box-border ltr ${!selectedTextTemplateOpen && "hidden"}`}>
      {/* question text container */}

      <div
        className="bg-white py-5 px-2 font-[700]  cursor-pointer  text-[#4E5257] items-end whitespace-pre-wrap inline-flex relative max-w-[100%] min-w-[40px] hover:shadow-md transition-all duration-200 flex-col "
        style={{ borderRadius: "20px 4px 20px 4px" }}>
        <p className="mr-auto text-gray-400">text from your selection</p>
        {text}
        <div
          onClick={() => {
            dispatch(setSelectedTextTemplateOpen(false))
            dispatch(setTextFromHtml(""))
          }}
          className="absolute top-0 right-0 text-[20px] ">
          <IoCloseCircleOutline />
        </div>
      </div>
      {/* question text container */}

      {/* toolbox popover */}
      <div className="left-0 pr-[8px] absolute z-[500] "></div>
      {/* toolbox popover */}
    </div>
  )
}
