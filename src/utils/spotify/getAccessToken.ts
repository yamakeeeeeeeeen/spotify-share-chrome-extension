import axios from 'axios'
import { SPOTIFY } from 'spotify-config'
import { encodeToBase64 } from 'utils/encodeToBase64'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS } = SPOTIFY
const url = 'https://accounts.spotify.com/api/token'

export const getAccessToken = async (code: string): Promise<string> => {
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', REDIRECT_URIS || '')

  const response = await axios
    .post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodeToBase64(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        )}`,
      },
    })
    .catch((reason) => {
      throw new Error(reason)
    })

  return response.data.access_token
}
