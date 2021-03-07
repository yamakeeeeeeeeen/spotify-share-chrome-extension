import { Button } from '@chakra-ui/react'
import { useGetTwitterShareUrl } from 'hooks/useGetTwitterShareUrl'
import type { Track } from 'hooks/usePlayer'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import { ImTwitter } from 'react-icons/im'
import { playerButtonStyles } from 'styles'

type Props = {
  track: Track
}

export const TwitterShareButton: FC<Props> = ({ track }) => {
  const tweetText = `${track.name} - ${track.artist} / ${track.albumName}`
  const shareUrl = useGetTwitterShareUrl(tweetText, track.trackUrl)

  const handleShare = useCallback(() => {
    window.open(shareUrl, '_blank')
  }, [shareUrl])

  return (
    <Button onClick={handleShare} {...playerButtonStyles}>
      <ImTwitter size={20} />
    </Button>
  )
}
