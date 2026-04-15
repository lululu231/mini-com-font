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
            type:Array,
            value:[]
        }
  },

  /**
   * 组件的初始数据
   */
  data: {
    innerTabData: []
  },
  observers: {
    tabData(newVal) {
      const allItem = {
        id: 0,
        community_name: '全部'
      };
  
      this.setData({
        innerTabData: [allItem, ...(newVal || [])]
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTabClick(e) {
        const index = e.currentTarget.dataset.index;
        const item = this.data.innerTabData[index];
      
        this.triggerEvent('change', {
          index,
          communityId: item.id
        });
      }
  }
})