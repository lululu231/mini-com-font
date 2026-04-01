// components/selectCommunity/selectCommunity.js
//搜索框选择社群
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    ///当前选择
        curTab:{
            type:Number,
            value:0
        },
        tabData:{
            type:Object,
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
    handleTabClick(e) {
      const index = e.currentTarget.dataset.index;
  
      // 1️⃣ 通知父组件
      this.triggerEvent('change', { index });
  
      // ❌ 不建议这样（受控组件）
      // this.setData({ curTab: index });
    }
  }
})