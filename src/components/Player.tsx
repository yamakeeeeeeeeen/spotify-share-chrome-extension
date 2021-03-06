import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { IconButton } from 'components/IconButton'
import { usePlayer } from 'hooks/usePlayer'
import { useTwitterShare } from 'hooks/useTwitterShare'
import type { VFC } from 'react'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import {
  BiPause,
  BiPlay,
  BiShuffle,
  BiSkipNext,
  BiSkipPrevious,
} from 'react-icons/bi'
import { ImTwitter } from 'react-icons/im'
import { IoRepeat } from 'react-icons/io5'
import { IoReloadOutline } from 'react-icons/io5'
import type { SpotifyWebApi } from 'spotify-web-api-ts'
import { COLOR, getDotButtonStyles } from 'styles'

type Props = {
  spotify: SpotifyWebApi
}
type ComponentProps = {
  player: ReturnType<typeof usePlayer>
  twitter: ReturnType<typeof useTwitterShare>
}

const iconSize = 30
const TrackRepeatIcon: VFC = () => (
  <Box
    p="2px"
    bgColor="#1e1e1e"
    pos="absolute"
    top="6px"
    right="12px"
    borderRadius="50%"
  >
    <Box
      w={3}
      h={3}
      bgColor={COLOR.PRIMARY}
      color="black"
      fontSize="8px"
      borderRadius="50%"
    >
      1
    </Box>
  </Box>
)

const Component: VFC<ComponentProps> = ({
  player: {
    track,
    isPlaying,
    isShuffle,
    repeatState,
    isFavorite,
    device,
    play,
    pause,
    prev,
    next,
    toggleFavorite,
    toggleShuffle,
    nextRepeatState,
    getPlaybackInfo,
  },
  twitter: { handleShare, isDisabled },
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
        {/*TODO: 白ボタン時のhoverの色修正*/}
        <IconButton
          onClick={toggleShuffle}
          pos="relative"
          {...(isShuffle && { color: COLOR.PRIMARY })}
          _hover={{
            color: COLOR.PRIMARY_HOVER,
          }}
          {...getDotButtonStyles(isShuffle)}
          icon={<BiShuffle size={20} />}
        />
        <IconButton onClick={prev} icon={<BiSkipPrevious size={iconSize} />} />
        {isPlaying ? (
          <IconButton onClick={pause} icon={<BiPause size={iconSize} />} />
        ) : (
          <IconButton onClick={play} icon={<BiPlay size={iconSize} />} />
        )}
        <IconButton onClick={next} icon={<BiSkipNext size={iconSize} />} />
        <IconButton
          onClick={nextRepeatState}
          pos="relative"
          {...(repeatState !== 'off' ? { color: COLOR.PRIMARY } : {})}
          _hover={{
            color: COLOR.PRIMARY_HOVER,
          }}
          {...getDotButtonStyles(repeatState !== 'off')}
          icon={<IoRepeat size={26} />}
        >
          {repeatState === 'track' && <TrackRepeatIcon />}
        </IconButton>
      </Flex>

      <Flex justifyContent="center">
        <IconButton
          onClick={handleShare}
          disabled={isDisabled}
          icon={<ImTwitter size={20} />}
        />
        <IconButton
          onClick={getPlaybackInfo}
          icon={<IoReloadOutline size={20} />}
        />
        {track && (
          <IconButton
            onClick={() => toggleFavorite(track.id)}
            icon={
              isFavorite ? (
                <AiFillHeart size={20} color={COLOR.PRIMARY} />
              ) : (
                <AiOutlineHeart size={20} />
              )
            }
          />
        )}
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
  const twitter = useTwitterShare(player.track)

  return <Component player={player} twitter={twitter} />
}
