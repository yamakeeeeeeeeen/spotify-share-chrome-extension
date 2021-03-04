import type { FC } from 'react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { PopupPage } from '../popup'

export const App: FC = () => {
  return (
    <Router>
      <PopupPage />
    </Router>
  )
}
