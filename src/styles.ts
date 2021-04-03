export const playerButtonStyles = {
  bgColor: 'transparent',
  color: '#b3b3b3',
  _active: {
    color: '#b3b3b3',
  },
  _hover: {
    bgColor: 'transparent',
    color: '#fff',
  },
  _focus: {
    border: 'none',
  },
}

export const COLOR = {
  PRIMARY: '#1db954',
}

export const getDotButtonStyles = (bool: boolean) =>
  bool
    ? ({
        _before: {
          pos: 'absolute',
          top: '35px',
          content: '""',
          w: '3px',
          h: '3px',
          bgColor: COLOR.PRIMARY,
          borderRadius: '50%',
        },
      } as const)
    : {}
