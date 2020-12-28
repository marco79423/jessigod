import {mutate} from 'swr'

import generateRandomString from '../utils/generateRandomString'

class SecretKeyManager {
  get() {
    let secretKey = window.localStorage.getItem('secretKey')
    if (!secretKey) {
      secretKey = generateRandomString(6)
      window.localStorage.setItem('secretKey', secretKey)
    }

    return secretKey
  }

  isShown() {
    let isSecretKeyShown = window.localStorage.getItem('isSecretKeyShown')
    if (isSecretKeyShown == null) {
      isSecretKeyShown = false
      window.localStorage.setItem('isSecretKeyShown', '0')
    }
    return !!+isSecretKeyShown
  }

  show() {
    window.localStorage.setItem('isSecretKeyShown', '1')
    mutate('/isSecretKeyShown', true)
  }

  hide() {
    window.localStorage.setItem('isSecretKeyShown', '0')
    mutate('/isSecretKeyShown', false)
  }
}

const secretKeyManager = new SecretKeyManager()

export default secretKeyManager
