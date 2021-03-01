import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { getAccessToken } from '~/utils/spotify/getAccessToken'

export const useAuth = (
  loginPath: string
): { accessToken: string | null; login: () => void } => {
  const { push, query } = useRouter()
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const login = useCallback(() => {
    push(loginPath)
  }, [loginPath, push])

  useEffect(() => {
    setAccessToken(localStorage.getItem('spotifyAccessToken'))
  }, [])

  useEffect(() => {
    if (query?.code && query?.state) {
      getAccessToken(query.code as string).then((token) => {
        localStorage.setItem('spotifyAccessToken', token)
        setAccessToken(token)
      })
      push('/')
    }
  }, [push, query])

  return { accessToken, login }
}
