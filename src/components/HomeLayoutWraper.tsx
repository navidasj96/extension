import React, { useEffect, useState } from "react"

import { useLangRedux } from "~helper/getLanguageStates"
import useGetWindowsWidth from "~helper/use-screenwidth"

import MobileNavbar from "./MobileNavbar"

export default function HomeLayoutWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const { screenWidth } = useGetWindowsWidth()
  const [containerWidth, setContainerWidth] = useState(screenWidth)
  const {} = useLangRedux()
  useEffect(() => {
    setContainerWidth(screenWidth - 61)
    // console.log(screenWidth - 65);
  }, [screenWidth])

  return (
    <div
      className={`fontIR text-left whitespace-normal font-[400px] text-[black] fixed box-border flex flex-row z-[5] overflow-hidden top-0 right-0 bottom-0 text-[14px] rtl !w-full bg-[#F4F4F5] `}>
      {/* ------------------------------------------ */}

      {/* mobile nave bar */}
      <MobileNavbar />
      {/* mobile nave bar */}

      {/* desktop navbar */}
      {/* desktop navbar */}

      {/* ------------------------------------------ */}
      {/* view wrapper  */}

      {children}
      {/* view wrapper  */}

      {/* {data && <p>{data.choices[0].message.content}</p>}
      {!data && <p>waiting</p>} */}
    </div>
  )
}
