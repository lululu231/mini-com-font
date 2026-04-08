// components/applyOrg/applyOrg.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
        admin:{
            type:String,
            value:'USER'
        }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlecommunityManage(){
        wx.navigateTo({
            url:'/pages/communityManage/communityManage'
        })
    }
  }
})