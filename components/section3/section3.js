// components/section3/section3.js
//社团卡片
Component({

  /**
   * 组件的属性列表
   */
  properties: {
        theme:{
            type:Number,
            value:0
        },
        communityId:{
            type:Number,
            value:0
        },
        mockMembers:{
            type:Array,
            value:[]
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
    handleActivityList(){
        wx.navigateTo({
            url:'/pages/activityList/activityList'
        })
    },
    
    handleMenberList(){
        wx.navigateTo({
            url:'/pages/memberList/memberList'
        })
    },
    goPublish(){
        wx.navigateTo({
            url:'/pages/noticeList/noticeList'
        })
    },
    goNewPost(){
        wx.navigateTo({
            url:'/pages/newPostPage/newPostPage'
        })
    },
    goForum(){
        console.log('clickForum')
        wx.switchTab({
            url:'/pages/forum/forum'
        })
    }
  }
})