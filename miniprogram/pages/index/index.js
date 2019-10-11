const db = wx.cloud.database();
const bilibili = db.collection('bilibili')
const videoList = db.collection('videoList')
const othersList = db.collection('othersList')
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    navList: [], //导航
    imgUrls: [], //轮播图
    videosList: [], //视频列表
    tip:false,
     //下划线css属性
     lineLeft: 0,
     //下划线css属性
     lineWidth:78
  },
  

  // 点击首页导航按钮
  activeNav(e) {

     //给active的菜单选项设置下划线
     this.activeUnderline(e.target.dataset.index)

     this.setData({
         //dataset里的index是wxml中自己添加的data-index的index属性
         currentIndex: e.target.dataset.index
     })
  },
 
  pageData:{
    "id": 4,
    "videoSrc": "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
    "videoTitle": "【2018】年度影视混剪 Ready Story 2018【混剪】",
    "author": "牧草君4",
    "playCount": "24.9万",
    "commentCount": 1345,
    "date": "12-15"
  },

  videos: {
    count: 'init',
    skip: 0,
    keyWords: '',
  },


  // 将数据发送到数据库 add({})   更新doc(‘数据_id’).update
  onSubmit() {
    othersList.add({
      data: {
        data: this.pageData
      }
    }).then(() => {
      wx.showToast({
        title: 'Success',
        icon: 'success',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.compData=this.selectComponent("#Tit");
    this.showNav()
    this.getData()
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
    this.refreshData(() => {
      wx.stopPullDownRefresh()
      this.videos.skip = 20
      this.videos.count = 'init'
      this.videos.keyWords = ''
      this.compData.onCancel()
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  showNav() {
    bilibili.get().then(res => {
      this.setData({
        navList: res.data[0].list,
        imgUrls: res.data[0].imgUrls,
      })
    })
  },

  refreshData(callback) {
    
      wx.showLoading({
        title: '数据加载中...'
      })
      videoList.get().then(resp => {
        this.videos.count = resp.data.length
        this.setData({
          tip:false,
          videosList: resp.data
        }, () => {
          wx.hideLoading()
          callback()
        })
      })
    
    
  
  },



  getData() {
    
    if (this.videos.count != 0) {
      wx.showLoading({
        title: '数据加载中...'
      })
    

      if (this.videos.keyWords) {
        videoList.where({
          data: {
            desc: new db.RegExp({
              regexp: this.videos.keyWords,
              option: 'i'
            })
          }
        }).get().then(resp => {
          this.setData({
            tip:false,
            videosList: resp.data
          }, () => {
            wx.hideLoading()
          })
        })
      } else {
        videoList.skip(this.videos.skip).get().then(resp => {
          let oldData = this.data.videosList
          this.videos.count = resp.data.length
          this.setData({
            tip:false,
            videosList: oldData.concat(resp.data)
          }, () => {
            this.videos.skip += 20
            wx.hideLoading()

          })
        })
      }

    }



  },

  onMySearch(event) {
    this.videos.keyWords = event.detail.keyWords
    let keyWords = event.detail.keyWords
    videoList.where({
      data: {
        desc: new db.RegExp({
          regexp: keyWords,
          option: 'i'
        })
      }
    }).get().then(resp => {
      if (resp.data.length != 0) {
        this.setData({
          tip:false,
          videosList: resp.data
        })
      } else {
        this.setData({
          videosList: [],
          tip:true
        })
      }

    })
  },

  //给当前active的导航选项添加下划线(参数是当前active选项的索引，从0开始)
  activeUnderline(index) {
    // let that = this
    //获取当前导航选项的位置信息
    wx.createSelectorQuery().select(`#nav${index}`).boundingClientRect((res) => {
      this.setData({
        lineWidth: parseInt(res.width),
        lineLeft: parseInt(res.left)
      })
    }).exec()
  },


  //页面滑动事件
  swiperTab(e) {
    //给active的菜单选项设置下划线
    this.activeUnderline(e.detail.current)

    this.setData({
        currentIndex: e.detail.current
    });
},
})