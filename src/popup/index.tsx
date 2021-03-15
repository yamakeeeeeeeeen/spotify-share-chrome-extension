import { Box, Button } from '@chakra-ui/react'
import { Player } from 'components/Player'
import { useAuth } from 'hooks/useAuth'
import { useSpotify } from 'hooks/useSpotify'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { login } from 'utils/spotify/login'

export const PopupPage: FC = () => {
  const { accessToken } = useAuth()
  const spotify = useSpotify(accessToken)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('spotifyAccessToken')
    const updateTime = localStorage.getItem('spotifyAccessTokenUpdateTime')
    const now = new Date().getTime()
    // 55分以内に発行されたトークンであれば有効
    const isValidToken = now - Number(updateTime) < 1000 * 60 * 55

    if (!token || !updateTime || !isValidToken) {
      setIsLoggedIn(false)
      return
    }
    setIsLoggedIn(true)
  }, [])

  return (
    <Box
      w={300}
      p={4}
      background="rgb(18,18,18) linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(57,57,57,1) 100%)"
    >
      {isLoggedIn ? (
        spotify && <Player spotify={spotify} />
      ) : (
        <Button onClick={login}>login</Button>
      )}
    </Box>
  )
}
