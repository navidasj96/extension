import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Conversation {
  type: "res" | "req"
  text: string
}
export interface FormState {
  chatText: string
  chatReply: string
  selectedTextTemplateOpen: boolean
  converstaion: Conversation[]
  textFromHtml: string
  command: string
  chatHistoryOpen: boolean
  displayedChatId: number
  fetching: boolean
  refetchReq: number
}

var initialState: FormState = {
  chatText: "",
  chatReply: "",
  selectedTextTemplateOpen: false,
  converstaion: [],
  textFromHtml: "",
  command: "",
  chatHistoryOpen: false,
  displayedChatId: 1000,
  fetching: false,
  refetchReq: 0
}

const LangSlice = createSlice({
  name: "LangReduc",
  initialState,
  reducers: {
    setChatText: (state, action: PayloadAction<string>) => {
      state.chatText = action.payload
    },
    setChatConversation: (state, action: PayloadAction<string>) => {
      state.chatReply = action.payload
    },
    setSelectedTextTemplateOpen: (state, action: PayloadAction<boolean>) => {
      state.selectedTextTemplateOpen = action.payload
    },
    setConvertation: (state, action: PayloadAction<Conversation>) => {
      state.converstaion.push(action.payload)
    },
    setTextFromHtml: (state, action: PayloadAction<string>) => {
      state.textFromHtml = action.payload
    },
    setCommand: (state, action: PayloadAction<string>) => {
      state.command = action.payload
    },
    setChatHistoryOpen: (state, action: PayloadAction<boolean>) => {
      state.chatHistoryOpen = true
    },
    setChatHistoryClose: (state, action: PayloadAction<boolean>) => {
      state.chatHistoryOpen = false
    },
    setConversationFromHistory: (state, action: PayloadAction<any>) => {
      state.converstaion = action.payload
    },
    setDisplayedChatId: (state, action: PayloadAction<number>) => {
      state.displayedChatId = action.payload
    },
    setFetchingFalse: (state) => {
      state.fetching = false
    },
    setFetchingTrue: (state) => {
      state.fetching = true
    },
    refetchReq: (state) => {
      state.refetchReq = state.refetchReq + 1
    }
  }
})

export const {
  setChatText,
  setChatConversation,
  setSelectedTextTemplateOpen,
  setConvertation,
  setTextFromHtml,
  setCommand,
  setChatHistoryOpen,
  setChatHistoryClose,
  setConversationFromHistory,
  setDisplayedChatId,
  setFetchingTrue,
  setFetchingFalse,
  refetchReq
} = LangSlice.actions
const LangSliceReducer = LangSlice.reducer
export default LangSliceReducer
