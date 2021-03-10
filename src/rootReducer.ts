import { combineReducers } from '@reduxjs/toolkit'
import { authModule } from 'modules/auth'

export const rootReducer = combineReducers({
  auth: authModule.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
