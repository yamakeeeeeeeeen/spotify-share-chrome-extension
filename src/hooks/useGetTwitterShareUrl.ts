import { useEffect, useState } from 'react'

const baseUrl = 'https://twitter.com/intent/tweet?'
const hashtags = ['hashtags', 'NowPlaying']

export const useGetTwitterShareUrl = (tweetText: string, trackUrl: string) => {
  const [shareUrl, setShareUrl] = useState<string>('')

  useEffect(() => {
    const text = ['text', tweetText]
    const url = ['url', trackUrl]
    const query = new URLSearchParams([text, hashtags, url]).toString()
    setShareUrl(`${baseUrl}${query}`)
  }, [trackUrl, tweetText])

  return shareUrl
}
