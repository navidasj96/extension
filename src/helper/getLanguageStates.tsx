import { useSelector } from "react-redux"

import type { Conversation } from "~langRedux/LanguageSlice"
import type { RootState } from "~langRedux/store"

export const useLangRedux = () => {
  const chatText = useSelector<RootState, string>(
    (state) => state.counter.chatText
  )
  const chatReply = useSelector<RootState, string>(
    (state) => state.counter.chatReply
  )
  const selectedTextTemplateOpen = useSelector<RootState, boolean>(
    (state) => state.counter.selectedTextTemplateOpen
  )
  const converstaion = useSelector<RootState, Conversation[]>(
    (state) => state.counter.converstaion
  )
  const textFromHtml = useSelector<RootState, string>(
    (state) => state.counter.textFromHtml
  )
  const command = useSelector<RootState, string>(
    (state) => state.counter.command
  )
  const chatHistoryOpen = useSelector<RootState, boolean>(
    (state) => state.counter.chatHistoryOpen
  )
  const displayedChatId = useSelector<RootState, number>(
    (state) => state.counter.displayedChatId
  )
  const fetching = useSelector<RootState, boolean>(
    (state) => state.counter.fetching
  )
  const refetchReq = useSelector<RootState, number>(
    (state) => state.counter.refetchReq
  )

  return {
    chatText,
    chatReply,
    selectedTextTemplateOpen,
    converstaion,
    textFromHtml,
    command,
    chatHistoryOpen,
    displayedChatId,
    fetching,
    refetchReq
  }
}
