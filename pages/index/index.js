import {
  Index
} from './index-model.js'
const indexData = new Index()
Page({

  data: {
    //中心点坐标
    lonLocation: 113.551340,
    latLocation: 34.830530,
    scale: 17,
    indexSort: 1,
    //默认缩放级别
    listContent: [{
      id: 1,
      name: '图书馆',
      img_url: '../../image/library.png'
    },
    {
      id: 2,
      name: '信息工程学院',
      img_url: '../../image/computer.png'
    }
    ]
  },

  onLoad: function (options) {
    this._onControls()
    this._onload()
  },

  _onload: function () {
    indexData.getIndexSortList().then(res=>{
      console.log(res)
      this.setData({
        sortList: res
      })
    })
  },
  _onLoadPoints: function () {
    let id = this.data.indexSort.toString()
    let that = this
    let storageData = wx.getStorageSync(id)
    let points = []
    if (storageData) {
      this.setData({
        markers: storageData
      })
      points = wx.getStorageSync(`sort_${id}`)
      this.includePointList(points)
    } else {
      indexData.getIndexLaPoint(id).then(res=>{
        let pointData = res,
          pointArr = []
        pointData.forEach(function (item) {
          let itemArr = {
            iconPath: "../../image/icon/position.png",
            id: item.id,
            latitude: item.lat,
            longitude: item.lon,
            width: 50,
            height: 50
          }
          let point = {
            latitude: item.lat,
            longitude: item.lon,
          }
          pointArr.push(itemArr)
          points.push(point)
        })
        wx.setStorageSync(id, pointArr)
        wx.setStorageSync(`sort_${id}`, points)
        this.setData({
          markers: pointArr
        })
        this.includePointList(points)
      })
    }
  },
  // 初始化时显示所有的点位信息
  includePointList: function (data) {
    this.mapCtx.includePoints({
      padding: [10],
      points: data
    })
  },
  _onControls: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.data.controlsLeft = res.screenWidth,
          that.data.controlsTop = res.screenHeight;
        that.setData({
          controls: [{
            id: 1,
            iconPath: "../../image/icon/搜索.png",
            position: {
              left: that.data.controlsLeft - 45, //270
              top: that.data.controlsTop - 210, //400
              width: 34,
              height: 34
            },
            clickable: true,
          },
          {
            id: 2,
            iconPath: "../../image/icon/position1.png",
            position: {
              left: that.data.controlsLeft - 45, //270
              top: that.data.controlsTop - 160, //400
              width: 32,
              height: 32
            },
            clickable: true,
          }
          ]
        })
      },
      fail: function (err) {
        console.log(err);
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('indexMap')
    this._onLoadPoints()
  },
  onShow: function(){
    // this._onLoadPoints()
  },

  onControlTap(event) {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  onDetail(event) {
    let id = event.markerId
    wx.navigateTo({
      url: `../faculty/faculty?id=${id}`,
    })
  },

  onSortTap: function (e) {
    let id = indexData.getCurrentData(e, 'id')
    this.data.indexSort = id
    this._onLoadPoints()
  }
})