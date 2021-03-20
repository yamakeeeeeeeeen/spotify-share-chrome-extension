import axios from 'axios'
import { SPOTIFY } from 'spotify-config'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS } = SPOTIFY
const url = 'https://accounts.spotify.com/api/token'

export const getAccessToken = async (code: string): Promise<string> => {
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', REDIRECT_URIS || '')

  const response = await axios.post(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`,
        'utf-8'
      ).toString('base64')}`,
    },
  })
  return response.data.access_token
}
