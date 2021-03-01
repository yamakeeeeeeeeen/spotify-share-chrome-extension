import { useEffect, useState } from 'react'
import { SpotifyWebApi } from 'spotify-web-api-ts'

import { SPOTIFY } from '~/spotify-config'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS } = SPOTIFY

export const useSpotify = (
  accessToken: string | null
): SpotifyWebApi | null => {
  const [spotify, setSpotify] = useState<SpotifyWebApi | null>(null)

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

  return spotify
}