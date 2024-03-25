import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"

import { PersistGate } from "@plasmohq/redux-persist/integration/react"

import "../style.css"

import { Main } from "~components/main"
import { store } from "~langRedux/store"
import { ThemeProvider } from "~theme"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    },
    mutations: {}
  }
})

function IndexPopup() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default IndexPopup
