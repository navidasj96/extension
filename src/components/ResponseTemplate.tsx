import { Popover } from "antd"
import React, { useEffect, useState } from "react"
import { FaBookmark, FaCopy } from "react-icons/fa"
import { IoPencilSharp } from "react-icons/io5"
import { MdFormatQuote } from "react-icons/md"

import { useLangRedux } from "~helper/getLanguageStates"

export default function ResponseTemplate({ text }: { text: string }) {
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
        {/* question text container */}
      </Popover>

      {/* toolbox popover */}
      {/* toolbox popover */}
    </div>
  )
}
