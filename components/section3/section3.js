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
        }
  },

  /**
   * 组件的初始数据
   */
  data: {
    mockMembers : [
        {
          id: 1,
          name: "张三",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
          id: 2,
          name: "李四",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
          id: 3,
          name: "王五",
          avatar: "https://randomuser.me/api/portraits/men/3.jpg"
        },
        {
          id: 4,
          name: "赵六",
          avatar: "https://randomuser.me/api/portraits/women/4.jpg"
        },
        {
          id: 5,
          name: "孙七",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg"
        },
        {
            id: 6,
            name: "孙七",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg"
          },
          {
            id: 7,
            name: "孙七",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg"
          },
        
      ]
      
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})