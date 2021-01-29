import useSWR from 'swr'

import originManager from '../../core/features/originManager'

export default function useOrigins() {
  const {data, error} = useSWR(
    '/origins',
    originManager.query,
  )

  return {
    origins: data,
    isLoading: !error && !data,
    isError: error
  }
}
