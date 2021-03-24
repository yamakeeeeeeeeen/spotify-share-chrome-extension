import { ChakraProvider } from '@chakra-ui/react'
import { PopupPage } from 'popup'
import type { VFC } from 'react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

export const App: VFC = () => {
  return (
    <Router>
      <ChakraProvider>
        <PopupPage />
      </ChakraProvider>
    </Router>
  )
}
