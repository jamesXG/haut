import { Base } from '../../utils/base.js'
class Detail extends Base {
  constructor() {
    super()
  }

  getLocationDetail(id) {
    let params = {
      url: `/location/${id}`,
    }
    return this.request(params)
  }
}

export {
  Detail
}