import { Box, Button, Flex } from '@chakra-ui/react'
import { Player } from 'components/Player'
import { useAuth } from 'hooks/useAuth'
import type { VFC } from 'react'
import React from 'react'
import { COLOR } from 'styles'
import { login } from 'utils/spotify/login'

export const PopupPage: VFC = () => {
  const { isLoggedIn, spotify } = useAuth()

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
        <Flex justifyContent="center">
          <Button
            onClick={login}
            w={160}
            h={8}
            bgColor={COLOR.PRIMARY}
            color="#fff"
            borderRadius={500}
            fontSize="12px"
          >
            LOG IN
          </Button>
        </Flex>
      )}
    </Box>
  )
}
