import {
  Base
} from '../../utils/base.js'
class Index extends Base {
  constructor() {
    super()
  }
  getIndexLaPoint(id) {
    let params = {
      url: `/list/${id}`,
    }
    return this.request(params)
  }

  getIndexSortList() {
    let params = {
      url: `/sort`,
    }
    return this.request(params)
  }
}

export {
  Index
}