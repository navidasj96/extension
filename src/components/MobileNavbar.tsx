import React from "react"
import { BsFillChatFill, BsPencil, BsTranslate } from "react-icons/bs"

export default function MobileNavbar() {
  return (
    <div
      className="w-[61px] pl-[1px] h-[100%] flex justify-center 
    items-center flex-col gap-y-[20px] relative overflow-hidden    bg-[#ECECEE]">
      <div className="h-[500px] w-[100%]  flex-1 flex items-start flex-col py-4  ">
        <div className="w-[54px] h-[54px]  flex flex-col-reverse gap-2 items-center justify-center cursor-pointer">
          <p className="font-[600]">Translate</p>
          <span className={`text-[20px] `}>
            <BsTranslate />
          </span>
        </div>
        <div className="w-[54px] h-[54px]  flex flex-col-reverse gap-2 items-center justify-center ">
          <p className="font-[600]">Write</p>
          <span className={`text-[20px] `}>
            <BsPencil />
          </span>
        </div>
        <div className="w-[54px] h-[54px]  flex flex-col-reverse gap-2 items-center justify-center ">
          <p className="font-[600]">Chat</p>
          <span className={`text-[20px] `}>
            <BsFillChatFill />
          </span>
        </div>
      </div>
      <div className="h-[400px] w-[100%] flex-1 flex items-start flex-col"></div>
    </div>
  )
}
