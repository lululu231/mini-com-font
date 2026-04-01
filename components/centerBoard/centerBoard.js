// pages/mainPage/centerBoard/centerBoard.js
//带轮播图的中心组件
import { DEFAULT_AVATAR } from '../../constants/index.js'

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
    cardItem:
    [{itemID:1,itemName:'社团风采',imgItem:'/assets/image/相机1.png'},
    {itemID:2,itemName:'活动日历',imgItem:'/assets/image/反馈.png'},
    {itemID:3,itemName:'我的社团',imgItem:'/assets/image/朋友.png'},
    {itemID:4,itemName:'消息通知',imgItem:'/assets/image/信息.png'}],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleRoute(e) {
      const id = e.currentTarget.dataset.id;
  
      console.log('点击的是：', id);
  
      switch (id) {
        // case 1:
        //   wx.navigateTo({
        //     url: '/pages/communityStyle/communityStyle'
        //   });
        //   break;
        // case 2:
        //   wx.navigateTo({
        //     url: '/pages/activityCalendar/activityCalendar'
        //   });
        //   break;
        case 3:
          wx.switchTab({
            url: '/pages/community/community'
          });
          break;
        // case 4:
        //   wx.navigateTo({
        //     url: '/pages/notification/notification'
        //   });
        //   break;
      }
    }
  }
})