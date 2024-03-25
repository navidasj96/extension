import type { PlasmoGetInlineAnchor } from "plasmo"

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector("div")
