import axios from 'axios'


export class OriginManager {

  async query() {
    const resp = await axios.get(`/api/origins`)
    return resp.data.data.map(origin => origin.name)
  }
}

const originManager = new OriginManager()

export default originManager
