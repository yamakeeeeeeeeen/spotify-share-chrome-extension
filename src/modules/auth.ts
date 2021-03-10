import { createSlice } from '@reduxjs/toolkit'

type State = {
  isLogin: boolean
}

const initialState: State = {
  isLogin: false,
}

const authModule = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginSuccessfully(state: State) {
      state.isLogin = true
    },
    setLoginUnSuccessfully(state: State) {
      state.isLogin = false
    },
  },
})

export { authModule }
export const {
  setLoginSuccessfully,
  setLoginUnSuccessfully,
} = authModule.actions
