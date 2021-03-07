import { SPOTIFY } from 'spotify-config'

const { CLIENT_ID, REDIRECT_URIS } = SPOTIFY

export const getLoginPath = (): string => {
  const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-read-recently-played',
    'playlist-modify-public',
    'playlist-modify-private',
  ]
  const params = new URLSearchParams()
  params.append('client_id', CLIENT_ID || '')
  params.append('response_type', 'code')
  params.append('redirect_uri', REDIRECT_URIS || '')
  params.append('scope', scopes.join(' '))
  params.append('state', 'state')

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}
