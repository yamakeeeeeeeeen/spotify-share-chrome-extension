import { useQuery } from 'hooks/useQuery'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAccessToken } from 'utils/spotify/getAccessToken'
import { getLoginPath } from 'utils/spotify/getLoginPath'

export const useAuth = (): {
  accessToken: string | null
  login: () => void
} => {
  const { push } = useHistory()
  const query = useQuery()
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const login = useCallback(() => {
    window.location.href = getLoginPath()
  }, [])

  useEffect(() => {
    setAccessToken(localStorage.getItem('spotifyAccessToken'))
  }, [])

  useEffect(() => {
    if (query.get('code') && query.get('state')) {
      getAccessToken(query.get('code') as string)
        .then((token) => {
          localStorage.setItem('spotifyAccessToken', token)
          setAccessToken(token)
        })
        .catch((reason) => {
          console.error(reason)
        })
      push('/')
    }
  }, [push, query])

  return { accessToken, login }
}
