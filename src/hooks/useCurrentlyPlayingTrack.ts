import { useEffect, useState } from 'react'
import { SpotifyWebApi } from 'spotify-web-api-ts'
import { Track } from 'spotify-web-api-ts/types/types/SpotifyObjects'

const implementsTrack = (arg: any): arg is Track => {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.disc_number === 'number'
  )
}

export const useCurrentlyPlayingTrack = (spotify: SpotifyWebApi) => {
  const [track, setTrack] = useState<Track | null>(null)

  useEffect(() => {
    spotify.player
      .getCurrentlyPlayingTrack()
      .then((value) => {
        if (typeof value !== 'string' && implementsTrack(value.item)) {
          setTrack(value.item)
        } else {
          setTrack(null)
        }
      })
      .catch(() => {
        localStorage.removeItem('spotifyAccessToken')
        // login()
      })
  }, [spotify.player])

  return track
}
