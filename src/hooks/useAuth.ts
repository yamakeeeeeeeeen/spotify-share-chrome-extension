import { useQuery } from 'hooks/useQuery'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SPOTIFY } from 'spotify-config'
import { SpotifyWebApi } from 'spotify-web-api-ts'
import { getAccessToken } from 'utils/spotify/getAccessToken'
import {
  getAccessTokenFromLocalStorage,
  getCodeFromLocalStorage,
  setAccessTokenToLocalStorage,
  setCodeToLocalStorage,
} from 'utils/spotify/localStorageOperaters'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS } = SPOTIFY

export const useAuth = (): {
  isLoggedIn: boolean
  spotify: SpotifyWebApi | null
} => {
  const { push } = useHistory()
  const query = useQuery()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [state, setState] = useState<string | null>(null)
  const [code, setCode] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const [spotify, setSpotify] = useState<SpotifyWebApi | null>(null)

  useEffect(() => {
    setCode(query.get('code'))
    setState(query.get('state'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // NOTE: spotifyのログインを行ないリダイレクトされた時に実行される
  useEffect(() => {
    if (code && state) {
      setCodeToLocalStorage(code)

      getAccessToken(code as string)
        .then((token) => {
          setAccessTokenToLocalStorage(token)
          setAccessToken(token)
          setIsLoggedIn(true)
          setSpotify(createSpotifyInstance(token))
        })
        .catch((reason) => {
          throw new Error(reason)
        })
      push('/')
    }
  }, [code, push, state])

  useEffect(() => {
    const { token, updateTime } = getAccessTokenFromLocalStorage()

    // ■初めて = access tokenがない
    if (!token) return

    const now = new Date().getTime()
    // 55分以内に発行されたトークンであれば有効
    const isValidToken = now - Number(updateTime) < 1000 * 60 * 55

    // ■ログインしたことがあり(localStorageにtokenがある)、1時間以内のアクセス
    if (isValidToken) {
      setSpotify(createSpotifyInstance(token))
      setAccessToken(token)
      setIsLoggedIn(true)
      return
    }

    // ■ログインしたことがあり(localStorageにtokenがある)、tokenの期限が切れている
    // TODO: useEffectを分割する/codeをlocalStorageのものにする
    if (!code) return
    setSpotify(
      new SpotifyWebApi({
        clientId: CLIENT_ID || '',
        clientSecret: CLIENT_SECRET || '',
        redirectUri: REDIRECT_URIS || '',
      })
    )
    spotify
      ?.getRefreshedAccessToken(code)
      .then((value) => {
        setAccessToken(value.access_token)
        spotify?.setAccessToken(accessToken as string)
        setSpotify(spotify)
        setIsLoggedIn(true)
      })
      .catch((reason) => {
        throw new Error(reason)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isLoggedIn, spotify }
}

const createSpotifyInstance = (accessToken: string) =>
  new SpotifyWebApi({
    accessToken,
    clientId: CLIENT_ID || '',
    clientSecret: CLIENT_SECRET || '',
    redirectUri: REDIRECT_URIS || '',
  })
