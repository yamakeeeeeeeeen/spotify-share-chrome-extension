import { Box, Button } from '@chakra-ui/react'
import { Player } from 'components/Player'
import { useAuth } from 'hooks/useAuth'
import { useSpotify } from 'hooks/useSpotify'
import type { FC } from 'react'
import React from 'react'
import { login } from 'utils/spotify/login'

export const PopupPage: FC = () => {
  const { isLoggedIn, accessToken } = useAuth()
  const spotify = useSpotify(accessToken)

  return (
    <Box
      w={300}
      p={4}
      background={
        'rgb(18,18,18) linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(57,57,57,1) 100%)'
      }
    >
      {isLoggedIn && spotify ? (
        <Player spotify={spotify} />
      ) : (
        <Button onClick={login}>login</Button>
      )}
    </Box>
  )
}
