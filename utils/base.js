import { Config } from './config.js'
class Base {
  constructor() {

  }
  request(params) {
    let url = Config.baseUrl + params.url
    if (!params.type) {
      params.type = 'GET'
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: params.type,
        success: function (res) {
          resolve(res.data)
        },
        fail: function (err) {
          reject({ error: '网络错误', code: 0 });
        }
      })
    })
  }

  getCurrentData(event, key) {
    return event.currentTarget.dataset[key]
  }
}

export {
  Base
}