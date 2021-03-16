import { useQuery } from 'hooks/useQuery'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAccessToken } from 'utils/spotify/getAccessToken'
import {
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from 'utils/spotify/localStorageOperaters'

export const useAuth = (): {
  isLoggedIn: boolean
  accessToken: string | null
} => {
  const { push } = useHistory()
  const query = useQuery()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const { token, updateTime } = getAccessTokenFromLocalStorage()
    const now = new Date().getTime()
    // 55分以内に発行されたトークンであれば有効
    const isValidToken = now - Number(updateTime) < 1000 * 60 * 55

    if (!token || !updateTime || !isValidToken) {
      setIsLoggedIn(false)
      setAccessToken(null)
      return
    }
    setIsLoggedIn(true)
    setAccessToken(token)
  }, [])

  // NOTE: spotifyのログインを行ないリダイレクトされた時に実行される
  useEffect(() => {
    if (query.get('code') && query.get('state')) {
      getAccessToken(query.get('code') as string)
        .then((token) => {
          setAccessTokenToLocalStorage(token)
          setAccessToken(token)
          setIsLoggedIn(true)
        })
        .catch((reason) => {
          console.error(reason)
        })
      push('/')
    }
  }, [push, query])

  return { isLoggedIn, accessToken }
}
