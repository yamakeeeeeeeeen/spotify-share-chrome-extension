import { getLoginPath } from './getLoginPath'

export const login = () => {
  window.location.href = getLoginPath()
}
