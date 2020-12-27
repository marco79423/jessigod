import useSWR, {mutate} from 'swr'


function generateRandomString(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export function useSecretKey() {
  const {data, error} = useSWR(
    '/secretKey',
    () => {
      let secretKey = window.localStorage.getItem('secretKey')
      if (!secretKey) {
        secretKey = generateRandomString(6)
        window.localStorage.setItem('secretKey', secretKey)
      }
      return secretKey
    },
  )

  return {
    secretKey: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useSecretKeyEnabled() {
  const {data, error} = useSWR(
    '/secretKeyEnabled',
    () => {
      let secretKeyEnabled = window.localStorage.getItem('secretKeyEnabled')
      if (secretKeyEnabled == null) {
        window.localStorage.setItem('secretKeyEnabled', '0')
      }
      return !!+secretKeyEnabled
    },
  )

  const setSecretKeyEnabled = (secretKeyEnabled) => {
    window.localStorage.setItem('secretKeyEnabled', secretKeyEnabled ? '1' : '0')
    mutate('/secretKeyEnabled', secretKeyEnabled)
  }

  return {
    secretKeyEnabled: data,
    isLoading: !error && !data,
    isError: error,
    setSecretKeyEnabled: setSecretKeyEnabled,
  }
}
