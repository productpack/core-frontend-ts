import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { ChakraProvider } from "@chakra-ui/react"
import { ProSidebarProvider } from "react-pro-sidebar"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ProSidebarProvider>
  </React.StrictMode>
)
