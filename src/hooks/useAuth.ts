import { useQuery } from 'hooks/useQuery'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SPOTIFY } from 'spotify-config'
import { SpotifyWebApi } from 'spotify-web-api-ts'
import { getAccessToken } from 'utils/spotify/getAccessToken'
import {
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from 'utils/spotify/localStorageOperaters'
import { login } from 'utils/spotify/login'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS } = SPOTIFY

const createSpotifyInstance = (accessToken: string) =>
  new SpotifyWebApi({
    accessToken,
    clientId: CLIENT_ID || '',
    clientSecret: CLIENT_SECRET || '',
    redirectUri: REDIRECT_URIS || '',
  })

export const useAuth = (): {
  isLoggedIn: boolean
  spotify: SpotifyWebApi | null
} => {
  const { push } = useHistory()
  const query = useQuery()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 認証画面からリダイレクトした時のquery
  const [queryState, setQueryState] = useState<string | null>(null)
  const [queryCode, setQueryCode] = useState<string | null>(null)

  const [spotify, setSpotify] = useState<SpotifyWebApi | null>(null)

  useEffect(() => {
    setQueryCode(query.get('code'))
    setQueryState(query.get('state'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // NOTE: spotifyのログインを行ないリダイレクトされた時に実行される
  useEffect(() => {
    if (!queryCode || !queryState) return
    getAccessToken(queryCode as string)
      .then((token) => {
        setAccessTokenToLocalStorage(token)
        setIsLoggedIn(true)
        setSpotify(createSpotifyInstance(token))
      })
      .catch((reason) => {
        throw new Error(reason)
      })
    push('/')
  }, [queryCode, push, queryState])

  useEffect(() => {
    const {
      accessToken: ls_accessToken,
      updateTime: ls_updateTime,
    } = getAccessTokenFromLocalStorage()

    // 1. 初回アクセス => ログインボタンを表示する
    if (!ls_accessToken) return

    const now = new Date().getTime()
    const isValidToken = now - Number(ls_updateTime) < 1000 * 60 * 55

    // 2. 前回のログインから55分以内のアクセス => トークンを使ってログイン
    if (isValidToken) {
      setSpotify(createSpotifyInstance(ls_accessToken))
      setIsLoggedIn(true)
      return
    }

    // 3. トークンの有効期限が切れている => 認証ページへ遷移
    login()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isLoggedIn, spotify }
}
