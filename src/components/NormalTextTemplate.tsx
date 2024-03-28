import React from "react"

import useType from "~helper/useType"

export default function NormalTextTemplate({
  text,
  last
}: {
  text: string
  last: boolean
}) {
  const { typedWords } = useType({ text })
  return (
    <div className="ml-5 bg-white py-5 px-2 font-[600]  cursor-pointer  text-[#4E5257] whitespace-pre-wrap inline-flex relative max-w-[90%] min-w-[40px] hover:shadow-md transition-all duration-200 flex-col ">
      {last ? typedWords : text}
    </div>
  )
}
