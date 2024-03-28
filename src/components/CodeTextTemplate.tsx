import React from "react"

import useType from "~helper/useType"

export default function CodeTextTemplate({
  text,
  last
}: {
  text: string
  last: boolean
}) {
  const { typedWords } = useType({ text })

  return (
    <div className="ml-5 bg-gray-800 py-5 px-2 font-[600]  cursor-pointer  text-gray-50  whitespace-pre-wrap inline-flex relative max-w-[90%] min-w-[40px] hover:shadow-md transition-all duration-200 flex-col ">
      {last ? typedWords : text}
    </div>
  )
}
