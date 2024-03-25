import ConfigProvider from "antd/es/config-provider"
import type { ReactNode } from "react"

import antdTheme from "~antdTheme/antThem"

export const ThemeProvider = ({ children = null as ReactNode }) => (
  <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
)
