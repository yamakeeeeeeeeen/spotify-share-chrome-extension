import React, { FC, useEffect, useState } from 'react'
import {
  CurrentlyPlaying,
  Track
} from 'spotify-web-api-ts/types/types/SpotifyObjects'

import { useAuth } from '../hooks/useAuth'
import { useSpotify } from '../hooks/useSpotify'
import { getLoginPath } from '../utils/spotify/getLoginPath'

const loginPath = getLoginPath()

const implementsTrack = (arg: any): arg is Track => {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.disc_number === 'number'
  )
}

export const PopupPage: FC = () => {
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
    <div style={{ width: 700, height: 700 }}>
      {accessToken ? (
        <p>Spotify Login Successful</p>
      ) : (
        <button onClick={login}>login</button>
      )}

      <p>-----------------</p>
      <p>path: {window.location.href}</p>

      <p>-----------------</p>
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
