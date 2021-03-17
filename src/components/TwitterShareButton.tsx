import { Button } from '@chakra-ui/react'
import { useGetTwitterShareUrl } from 'hooks/useGetTwitterShareUrl'
import type { Track } from 'hooks/usePlayer'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { ImTwitter } from 'react-icons/im'
import { playerButtonStyles } from 'styles'

type Props = {
  track: Track | null
}

export const TwitterShareButton: FC<Props> = ({ track }) => {
  const tweetText = `${track?.name} - ${track?.artist} / ${track?.albumName}`
  const shareUrl = useGetTwitterShareUrl(tweetText, track?.trackUrl || '')

  const handleShare = useCallback(() => {
    window.open(shareUrl, '_blank')
  }, [shareUrl])

  const [isDisabled, setIsDisabled] = useState(true)
  useEffect(() => {
    if (track) {
      const { name, artist, albumName, trackUrl } = track
      if (name || artist || albumName || trackUrl) {
        setIsDisabled(false)
        return
      }
    }

    setIsDisabled(true)
  }, [track])

  return (
    <Button onClick={handleShare} {...playerButtonStyles} disabled={isDisabled}>
      <ImTwitter size={20} />
    </Button>
  )
}
