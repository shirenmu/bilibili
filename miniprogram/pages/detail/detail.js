const db = wx.cloud.database();
const otherList = db.collection('othersList')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    videoInfo:null, // 视频详细信息
    othersList:[],  // 推荐视频
    commentData:[], //   评论


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentVideo(options.id)
    this.getOthersList(options.id)
    this.getCommentData(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  getCurrentVideo(videoId){
    // wx.request({
    //   url:`https://easy-mock.com/mock/5ccc2cc89e5cbc7d96b29785/bili/videoDetail?id=${videoId}`,
    //   success:(res)=>{
    //     if(res.data.code === 0){
    //       this.setData({
    //         videoInfo:res.data.data.videoInfo
    //       })
    //     }
    //   }
    // })

    otherList.get().then(res=>{
      this.setData({
        videoInfo:res.data[2].data
      })
    })
  },


  getOthersList(videoId){
    // wx.request({
    //   url:`https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/othersList?iid=${videoId}`,
    //   success:(res)=>{
    //     if(res.data.code === 0){
    //       this.setData({
    //         othersList:res.data.data.othersList
    //       })
    //     }
    //   }
    // })

    otherList.get().then(res=>{
      this.setData({
        othersList:res.data[1].data
      })
    })

    
  },



  getCommentData(videoId){
    // wx.request({
    //   url:`https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/commentsList?id=${videoId}`,
    //   success:(res)=>{
    //     if(res.data.code === 0){
    //       this.setData({
    //         commentData:res.data.data.commentData
    //       })
    //     }
    //   }
    // })

    otherList.get().then(res=>{
      this.setData({
        commentData:res.data[0].data
      })
    })


  }
})