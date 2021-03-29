import { useCallback, useEffect, useState } from 'react'
import type { SpotifyWebApi } from 'spotify-web-api-ts'
import type {
  CurrentlyPlayingContext,
  Device,
} from 'spotify-web-api-ts/types/types/SpotifyObjects'

export type Track = {
  id: string
  name: string
  albumName: string
  artist: string
  cover: string
  trackUrl: string
}

export const usePlayer = (spotify: SpotifyWebApi) => {
  const [
    playbackInfo,
    setPlaybackInfo,
  ] = useState<CurrentlyPlayingContext | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [track, setTrack] = useState<Track | null>(null)
  const [device, setDevice] = useState<Device | null>(null)

  /**
   * 現在の情報を取得する
   */
  const getPlaybackInfo = useCallback(() => {
    spotify.player
      .getPlaybackInfo()
      .then((value) => setPlaybackInfo(value))
      .catch((reason) => console.error(reason))
  }, [spotify.player])

  /**
   * pause music
   */
  const pause = useCallback(() => {
    spotify.player
      .pause()
      .then(async () => await getPlaybackInfo())
      .catch((reason) => console.error(reason))
  }, [getPlaybackInfo, spotify.player])

  /**
   * play music
   */
  const play = useCallback(() => {
    spotify.player
      .play()
      .then(async () => await getPlaybackInfo())
      .catch((reason) => console.error(reason))
  }, [getPlaybackInfo, spotify.player])

  /**
   * skip to previous song
   */
  const prev = useCallback(() => {
    spotify.player
      .skipToPrevious()
      .then(async () => await getPlaybackInfo())
      .catch((reason) => console.error(reason))
  }, [getPlaybackInfo, spotify.player])

  /**
   * skip to next song
   */
  const next = useCallback(() => {
    spotify.player
      .skipToNext()
      .then(async () => await getPlaybackInfo())
      .catch((reason) => console.error(reason))
  }, [getPlaybackInfo, spotify.player])

  /**
   * toggle favorite state
   */
  const toggleFavorite = useCallback(
    (trackId: string, isFavorite: boolean) => {
      if (isFavorite) {
        spotify.library
          .removeSavedTrack(trackId)
          .then(async () => await getPlaybackInfo())
          .catch((reason) => console.error(reason))
      } else {
        spotify.library
          .saveTrack(trackId)
          .then(async () => await getPlaybackInfo())
          .catch((reason) => console.error(reason))
      }
    },
    [getPlaybackInfo, spotify.library]
  )

  useEffect(() => {
    getPlaybackInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (playbackInfo === null) return

    const trackId = playbackInfo.item?.id
    if (trackId) {
      spotify.library
        .isTrackSaved(trackId)
        .then((value) => setIsFavorite(value))
        .catch((reason) => console.error(reason))
    } else {
      setIsFavorite(false)
    }
  }, [playbackInfo, spotify.library])
  useEffect(() => {
    if (playbackInfo === null) return

    setIsPlaying(playbackInfo.is_playing)
    setIsShuffle(playbackInfo.shuffle_state)
    setTrack({
      id: playbackInfo.item?.id || '',
      name: playbackInfo.item?.name || '',
      albumName: playbackInfo.item?.album.name || '',
      artist: playbackInfo.item?.artists[0].name || '',
      cover: playbackInfo.item?.album.images[0].url || '',
      trackUrl: playbackInfo.item?.external_urls.spotify || '',
    })
    setDevice(playbackInfo.device)
  }, [playbackInfo])

  return {
    track,
    isPlaying,
    isShuffle,
    isFavorite,
    device,
    play,
    pause,
    prev,
    next,
    toggleFavorite,
    getPlaybackInfo,
  }
}
