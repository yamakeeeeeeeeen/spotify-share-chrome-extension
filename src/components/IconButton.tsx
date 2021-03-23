import type { ButtonProps } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import type { VFC } from 'react'
import React from 'react'
import { playerButtonStyles } from 'styles'

type Props = ButtonProps & {
  icon: JSX.Element
}

export const IconButton: VFC<Props> = ({ icon, ...rest }) => (
  <Button {...rest} {...playerButtonStyles}>
    {icon}
  </Button>
)
