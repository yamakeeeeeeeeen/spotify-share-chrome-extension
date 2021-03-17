import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { ReloadButton } from 'components/ReloadButton'
import { TwitterShareButton } from 'components/TwitterShareButton'
import { usePlayer } from 'hooks/usePlayer'
import type { FC } from 'react'
import React from 'react'
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import type { SpotifyWebApi } from 'spotify-web-api-ts'
import { playerButtonStyles } from 'styles'

type Props = {
  spotify: SpotifyWebApi
}
type ComponentProps = {
  player: ReturnType<typeof usePlayer>
}

const iconSize = 30

const Component: FC<ComponentProps> = ({
  player: {
    track,
    isPlaying,
    device,
    play,
    pause,
    prev,
    next,
    getPlaybackInfo,
  },
}) => (
  <Flex justifyContent="center" w={270}>
    <Box>
      <Flex justifyContent="center" mb={3}>
        <Image boxSize="250px" src={track?.cover} alt={track?.name} />
      </Flex>
      <Box mb={4}>
        <Text mb={2} fontSize="lg" textAlign="center" color="white">
          {track?.name}
        </Text>
        <Text fontSize="sm" textAlign="center" color="#b3b3b3">
          {track?.artist} - {track?.albumName}
        </Text>
      </Box>

      <Flex justifyContent="center">
        <Button onClick={prev} {...playerButtonStyles}>
          <BiSkipPrevious size={iconSize} />
        </Button>
        {isPlaying ? (
          <Button onClick={pause} {...playerButtonStyles}>
            <BiPause size={iconSize} />
          </Button>
        ) : (
          <Button onClick={play} {...playerButtonStyles}>
            <BiPlay size={iconSize} />
          </Button>
        )}
        <Button onClick={next} {...playerButtonStyles}>
          <BiSkipNext size={iconSize} />
        </Button>
      </Flex>

      <Flex justifyContent="center">
        <TwitterShareButton track={track} />
        <ReloadButton getPlaybackInfo={getPlaybackInfo} />
      </Flex>

      {device && (
        <Text mt={10} fontSize="sm" textAlign="center" color="#b3b3b3">
          Playing in {device.name}
        </Text>
      )}
    </Box>
  </Flex>
)

export const Player: FC<Props> = ({ spotify }) => {
  const player = usePlayer(spotify)

  return <Component player={player} />
}
