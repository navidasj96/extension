import { Box } from "@mui/material"
import React from "react"

import MobileNavbar from "./MobileNavbar"

export default function MainNavbar() {
  return (
    <Box className="w-[61px] h-screen border bg-[#ECECEE]">
      <Box className="fixed flex flex-col w-full items-center justify-center">
        <div className="w-full  flex flex-col justify-center h-full  ">
          <MobileNavbar />
        </div>
      </Box>
    </Box>
  )
}
