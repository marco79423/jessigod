import useSWR from 'swr'


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
