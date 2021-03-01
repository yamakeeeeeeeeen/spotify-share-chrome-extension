import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { SpotifyWebApi } from 'spotify-web-api-ts'
import type {
  CurrentlyPlaying,
  Track
} from 'spotify-web-api-ts/types/types/SpotifyObjects'

import { SPOTIFY } from '~/spotify-config'
import { getAccessToken } from '~/utils/spotify/getAccessToken'
import { getLoginPath } from '~/utils/spotify/getLoginPath'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS } = SPOTIFY

type Props = {
  loginPath: string
}

const implementsTrack = (arg: any): arg is Track => {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.disc_number === 'number'
  )
}

const Home = ({
  loginPath
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { push, query } = useRouter()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [spotify, setSpotify] = useState<SpotifyWebApi | null>(null)
  const [currPlaying, setCurrPlaying] = useState<
    string | CurrentlyPlaying | null
  >(null)

  const login = useCallback(() => {
    push(loginPath)
  }, [loginPath, push])

  useEffect(() => {
    if (query?.code && query?.state) {
      getAccessToken(query.code as string).then((token) => {
        setAccessToken(token)
      })
      push('/')
    }
  }, [push, query])

  useEffect(() => {
    if (!accessToken) return

    setSpotify(
      new SpotifyWebApi({
        accessToken,
        clientId: CLIENT_ID || '',
        clientSecret: CLIENT_SECRET || '',
        redirectUri: REDIRECT_URIS || ''
      })
    )
  }, [accessToken])

  useEffect(() => {
    if (!spotify) return
    ;(async () => {
      setCurrPlaying(await spotify.player.getCurrentlyPlayingTrack())
    })()
  }, [spotify])

  return (
    <div>
      {accessToken ? (
        <p>{accessToken}</p>
      ) : (
        <button onClick={login}>login</button>
      )}

      {currPlaying &&
      typeof currPlaying !== 'string' &&
      implementsTrack(currPlaying.item) ? (
        <div>
          <h2>{currPlaying.item.name}</h2>
          <img
            src={currPlaying.item.album.images[0].url}
            alt={currPlaying.item.name}
          />
        </div>
      ) : null}
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    loginPath: getLoginPath()
  }
})

export default Home
