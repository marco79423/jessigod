import useSWR, {mutate} from 'swr'


export function useSecretKey() {
  const {data, error} = useSWR(
    '/secretKey',
    () => {
      let secretKey = window.localStorage.getItem('secretKey')
      if (!secretKey) {
        secretKey = Math.random().toString(36).substring(7)
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
        window.localStorage.setItem('secretKey', '0')
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
