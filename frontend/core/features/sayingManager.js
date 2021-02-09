import axios from 'axios'

import secretKeyManager from './secretKeyManager'


export class SayingManager {

  async query(pageIndex, editorOnly, origin) {
    const secretKey = secretKeyManager.get()
    const resp = await axios.get(`/api/sayings?pageIndex=${pageIndex}&editorOnly=${editorOnly}&origin=${origin}`, {
      headers: {
        'Authorization': `Jessi ${secretKey}`
      }
    })
    return [resp.data.data, resp.data.pagination]
  }

  async create(saying) {
    const secretKey = secretKeyManager.get()

    const jsonData = {
      origin: saying.origin.trim(),
      content: saying.content.trim(),
    }

    await axios.post('/api/sayings', jsonData, {
      headers: {
        Authorization: `Jessi ${secretKey}`
      }
    })
  }

  async modify(saying) {
    const secretKey = secretKeyManager.get()

    const jsonData = {
      origin: saying.origin.trim(),
      content: saying.content.trim(),
    }

    await axios.put(`/api/sayings/${saying.id}`, jsonData, {
      headers: {
        Authorization: `Jessi ${secretKey}`
      },
    })
  }

  async delete(sayingID) {
    const secretKey = secretKeyManager.get()

    await axios.delete(`/api/sayings/${sayingID}`, {
      headers: {
        Authorization: `Jessi ${secretKey}`
      }
    })
  }
}

const sayingManager = new SayingManager()

export default sayingManager
