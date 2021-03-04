import { useCurrentlyPlayingTrack } from 'hooks/useCurrentlyPlayingTrack'
import type { FC } from 'react'
import React from 'react'
import type { SpotifyWebApi } from 'spotify-web-api-ts'

type Props = {
  spotify: SpotifyWebApi
}
type ComponentProps = {
  track: ReturnType<typeof useCurrentlyPlayingTrack>
}

const Component: FC<ComponentProps> = ({ track }) => (
  <div>
    {track ? (
      <div>
        <h2>{track.name}</h2>
        <img src={track.album.images[0].url} alt={track.name} />
      </div>
    ) : (
      <p>{`It's not playing.`}</p>
    )}
  </div>
)

export const Player: FC<Props> = ({ spotify }) => {
  const track = useCurrentlyPlayingTrack(spotify)

  return <Component track={track} />
}
