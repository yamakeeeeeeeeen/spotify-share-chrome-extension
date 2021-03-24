import type { Track } from 'hooks/usePlayer'
import { useCallback, useEffect, useMemo, useState } from 'react'

const baseUrl = 'https://twitter.com/intent/tweet?'
const hashtags = ['hashtags', 'NowPlaying']

export const useTwitterShare = (
  track: Track | null
): { handleShare: () => void; isDisabled: boolean } => {
  const tweetText = useMemo(
    () => `${track?.name} - ${track?.artist} / ${track?.albumName}`,
    [track]
  )
  const trackUrl = useMemo(() => track?.trackUrl || '', [track])

  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    const text = ['text', tweetText]
    const url = ['url', trackUrl]
    const query = new URLSearchParams([text, hashtags, url]).toString()
    setShareUrl(`${baseUrl}${query}`)
  }, [trackUrl, tweetText])

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

  return { handleShare, isDisabled }
}
