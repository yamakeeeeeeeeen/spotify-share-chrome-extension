import { ChakraProvider } from '@chakra-ui/react'
import { PopupPage } from 'popup'
import type { FC } from 'react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

export const App: FC = () => {
  return (
    <Router>
      <ChakraProvider>
        <PopupPage />
      </ChakraProvider>
    </Router>
  )
}
