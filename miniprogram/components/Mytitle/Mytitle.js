// components/Mytitle/Mytitle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    
    titStatus:true

  },

  /**
   * 组件的方法列表
   */
  methods: {

    search(){
      this.setData({
        titStatus:false
      })
    },

    onCancel(){
      this.setData({
        titStatus: true
      })
    },

    onSearch(event){
      this.triggerEvent('mySearch',{keyWords:event.detail})
    }

  }
})
