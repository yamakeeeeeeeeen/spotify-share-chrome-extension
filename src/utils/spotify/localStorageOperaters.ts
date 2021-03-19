const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'spotifyAccessToken',
  CODE: 'spotifyCode',
  UPDATE_TIME: 'spotifyAccessTokenUpdateTime',
}

export const setAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken)
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.UPDATE_TIME,
    new Date().getTime().toString()
  )
}

export const getAccessTokenFromLocalStorage = () => ({
  accessToken: localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
  updateTime: localStorage.getItem(LOCAL_STORAGE_KEYS.UPDATE_TIME),
})

export const setCodeToLocalStorage = (code: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.CODE, code)
}

export const getCodeFromLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.CODE)
