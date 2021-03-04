import { Player } from 'components/Player'
import { useAuth } from 'hooks/useAuth'
import { useSpotify } from 'hooks/useSpotify'
import type { FC } from 'react'
import React from 'react'
import { getLoginPath } from 'utils/spotify/getLoginPath'

const loginPath = getLoginPath()

export const PopupPage: FC = () => {
  const { accessToken, login } = useAuth(loginPath)
  const spotify = useSpotify(accessToken)

  return (
    <div style={{ width: 700, height: 700 }}>
      {!accessToken && <button onClick={login}>login</button>}
      {spotify && <Player spotify={spotify} />}
    </div>
  )
}
