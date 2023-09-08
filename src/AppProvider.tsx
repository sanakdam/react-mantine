import { CSSObject, Global, MantineProvider, MantineThemeOverride } from "@mantine/core"
import { FC, ReactElement } from "react"

const theme: MantineThemeOverride = {
  colorScheme: "light",
  fontFamily: "roboto, sans-serif"
}

const globalStyle: CSSObject = {
  body: {
    padding: 0,
    margin: 0
  },
  "#root": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    maxHeight: "100%",
    width: "100vw",
    maxWidth: "100%",
    boxSizing: "border-box"
  }
}

interface AppProviderProps {
  children: ReactElement
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={theme}
    >
      <Global styles={globalStyle} />

      {children}
    </MantineProvider>
  )
}

export default AppProvider