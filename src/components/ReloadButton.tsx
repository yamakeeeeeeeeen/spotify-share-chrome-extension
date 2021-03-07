import { Button } from '@chakra-ui/react'
import type { usePlayer } from 'hooks/usePlayer'
import type { FC } from 'react'
import React from 'react'
import { IoReloadOutline } from 'react-icons/io5'
import { playerButtonStyles } from 'styles'

type Props = {
  getPlaybackInfo: ReturnType<typeof usePlayer>['getPlaybackInfo']
}

export const ReloadButton: FC<Props> = ({ getPlaybackInfo }) => {
  return (
    <Button onClick={getPlaybackInfo} {...playerButtonStyles}>
      <IoReloadOutline size={20} />
    </Button>
  )
}
