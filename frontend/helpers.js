import useSWR from 'swr'


function fetchJSON(url) {
  return fetch(url)
    .then(res => res.json())
    .then(data => data.data)
}


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

export function useSayings() {
  const {data, error} = useSWR(
    '/api/sayings',
    fetchJSON,
  )

  return {
    sayings: data,
    isLoading: !error && !data,
    isError: error
  }
}
