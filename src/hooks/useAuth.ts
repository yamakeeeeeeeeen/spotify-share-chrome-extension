import { useQuery } from 'hooks/useQuery'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAccessToken } from 'utils/spotify/getAccessToken'

export const useAuth = (
  loginPath: string
): { accessToken: string | null; login: () => void } => {
  const { push } = useHistory()
  const query = useQuery()
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const login = useCallback(() => {
    window.location.href = loginPath
  }, [loginPath])

  useEffect(() => {
    setAccessToken(localStorage.getItem('spotifyAccessToken'))
  }, [])

  useEffect(() => {
    if (query.get('code') && query.get('state')) {
      getAccessToken(query.get('code') as string).then((token) => {
        localStorage.setItem('spotifyAccessToken', token)
        setAccessToken(token)
      })
      push('/')
    }
  }, [push, query])

  return { accessToken, login }
}
