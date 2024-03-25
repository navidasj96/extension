export const getLocalStorageChats = () => {
  const chats = JSON.parse(localStorage.getItem("chats"))

  if (!chats) return null

  return chats
}

export const setLocalStorageChats = ({
  conversationChats,
  convId,
  current
}: {
  conversationChats: any
  convId?: number
  current?: boolean
}) => {
  let id: number
  const chats = JSON.parse(localStorage.getItem("chats"))

  // no chat in the local storage
  if (!chats) {
    id = current ? 1000 : 0
    const newMember = { id, conversationChats }
    localStorage.setItem("chats", JSON.stringify([newMember]))
  }

  //saving new conversation with every changes in the current conversation
  if (current && chats) {
    id = 1000
    const filteredChats = chats.filter((item) => item.id !== id)

    const newMember = { id, conversationChats }
    filteredChats.unshift(newMember)
    localStorage.setItem("chats", JSON.stringify(filteredChats))
  }
  //edit old chats
  if (!current) {
    const filteredChats = chats.filter((item) => item.id !== convId)
    const newMember = { id: convId, conversationChats }
    filteredChats.unshift(newMember)
    localStorage.setItem("chats", JSON.stringify(filteredChats))
  }
}

export const SetStorageBegoreUnmount = () => {
  const chats = JSON.parse(localStorage.getItem("chats"))
  if (chats && chats.length > 0) {
    const mapedChates = chats.map((item) => {
      if (item.id !== 1000) return item
      return { id: chats.length, conversationChats: item.conversationChats }
    })
    localStorage.setItem("chats", JSON.stringify(mapedChates))
  }
}
