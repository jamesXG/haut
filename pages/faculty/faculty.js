import { Detail } from './faculty-model'
const detailData = new Detail()
Page({

  data: {
    pointInfo: {}
  },

  onLoad: function (options) {
    const { id } = options
    this._onLoad(id)
  },

  _onLoad: function (id) {
    detailData.getLocationDetail(id).then(res=>{
      this.setData({
        pointInfo: res
      })
    })
  }
})
