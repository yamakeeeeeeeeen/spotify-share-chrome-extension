import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useEffect, useState } from 'react'
import type {
  CurrentlyPlaying,
  Track
} from 'spotify-web-api-ts/types/types/SpotifyObjects'

import { useAuth } from '~/hooks/useAuth'
import { useSpotify } from '~/hooks/useSpotify'
import { getLoginPath } from '~/utils/spotify/getLoginPath'

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
  const [currPlaying, setCurrPlaying] = useState<
    string | CurrentlyPlaying | null
  >(null)

  const { accessToken, login } = useAuth(loginPath)
  const spotify = useSpotify(accessToken)

  useEffect(() => {
    if (!spotify) return

    spotify.player
      .getCurrentlyPlayingTrack()
      .then((value) => {
        setCurrPlaying(value)
      })
      .catch(() => {
        localStorage.removeItem('spotifyAccessToken')
        login()
      })
  }, [login, spotify])

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
