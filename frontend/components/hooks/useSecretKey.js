import useSWR from 'swr'
import secretKeyManager from '../../core/features/secretKeyManager'

export default function useSecretKey() {
  const {data, error} = useSWR(
    '/secretKey',
    secretKeyManager.get,
  )

  return {
    secretKey: data,
    isLoading: !error && !data,
    isError: error
  }
}
