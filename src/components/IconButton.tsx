import type { ButtonProps } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import type { FC } from 'react'
import React from 'react'
import { playerButtonStyles } from 'styles'

type Props = ButtonProps & {
  icon: JSX.Element
}

export const IconButton: FC<Props> = ({ icon, children, ...rest }) => (
  <Button {...playerButtonStyles} {...rest}>
    {icon}
    {children}
  </Button>
)
