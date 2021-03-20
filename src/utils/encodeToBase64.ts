export const encodeToBase64 = (str: string): string =>
  Buffer.from(str, 'utf-8').toString('base64')
