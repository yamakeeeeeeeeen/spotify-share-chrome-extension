import { ChakraProvider } from '@chakra-ui/react'
import { PopupPage } from 'popup'
import type { FC } from 'react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from 'store'

export const App: FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <ChakraProvider>
          <PopupPage />
        </ChakraProvider>
      </Provider>
    </Router>
  )
}
