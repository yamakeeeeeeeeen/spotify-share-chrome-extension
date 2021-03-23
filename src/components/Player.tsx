import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { IconButton } from 'components/IconButton'
import { TwitterShareButton } from 'components/TwitterShareButton'
import { usePlayer } from 'hooks/usePlayer'
import type { VFC } from 'react'
import React from 'react'
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { IoReloadOutline } from 'react-icons/io5'
import type { SpotifyWebApi } from 'spotify-web-api-ts'

type Props = {
  spotify: SpotifyWebApi
}
type ComponentProps = {
  player: ReturnType<typeof usePlayer>
}

const iconSize = 30

const Component: VFC<ComponentProps> = ({
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
        <IconButton onClick={prev} icon={<BiSkipPrevious size={iconSize} />} />
        {isPlaying ? (
          <IconButton onClick={pause} icon={<BiPause size={iconSize} />} />
        ) : (
          <IconButton onClick={play} icon={<BiPlay size={iconSize} />} />
        )}
        <IconButton onClick={next} icon={<BiSkipNext size={iconSize} />} />
      </Flex>

      <Flex justifyContent="center">
        <TwitterShareButton track={track} />
        <IconButton
          onClick={getPlaybackInfo}
          icon={<IoReloadOutline size={20} />}
        />
      </Flex>

      {device && (
        <Text mt={10} fontSize="sm" textAlign="center" color="#b3b3b3">
          Playing in {device.name}
        </Text>
      )}
    </Box>
  </Flex>
)

export const Player: VFC<Props> = ({ spotify }) => {
  const player = usePlayer(spotify)

  return <Component player={player} />
}
