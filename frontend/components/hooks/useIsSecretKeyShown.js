import useSWR from 'swr'
import secretKeyManager from '../../core/features/secretKeyManager'


export default function useIsSecretKeyShown() {
  const {data, error} = useSWR(
    '/isSecretKeyShown',
    secretKeyManager.isShown,
  )

  return {
    isSecretKeyShown: data,
    isLoading: !error && !data,
    isError: error,
    showSecretKey: secretKeyManager.show,
    hideSecretKey: secretKeyManager.hide,
  }
}
