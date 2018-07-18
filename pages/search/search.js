Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowClear: false,
    content: '',
    listContent: [
      {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindInputContent: function (event) {

    let length = event.detail.cursor;
    this.data.content = event.detail.value;
    if (length == 0) {
      this.setData({
        isShowClear: false,
        collegeShow:false
      })
    } else {
      this.setData({
        isShowClear: true
      })
    }
  },
  onClearTap: function (event) {
    this.data.content = '';
    this.setData({
      isShowClear: false,
      collegeShow:false,
      content: ''
    })
  },

  bindConfirm: function (event) {

    // let length = event.detail.cursor;
     this.data.content = event.detail.value;
    console.log(event);
    if (this.data.content=='') {
      this.setData({
        collegeShow: false,
      })
    } else {
      this.setData({
        collegeShow: true
      })
    }
  }

})
