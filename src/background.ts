// // background.js
// chrome.runtime.onInstalled.addListener(() => {
//   // Initialize storage with default values
//   chrome.storage.local.set({ start: null })
// })

// // When the timer starts, save the current time
// const now = Date.now()
// chrome.storage.local.set({ start: now })
import { Storage } from "@plasmohq/storage"

console.log("Hello from BGSW!")
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))

chrome.action.onClicked.addListener(() => {
  console.log("action is clicked")
})
