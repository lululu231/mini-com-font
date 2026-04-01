// components/commentCard/commentItem/commentItem.js

Component({

  /**
   * 组件的属性列表
   */
  properties: {
        root:{
            type:Object,
            value:{}
        },
        // childrenList:{
        //     type:Array,
        //     value:[]
        // }
  },

  /**
   * 组件的初始数据
   */
  data: {
        //childrenList:[]
        displayContent:'',
        ATcontent:''
  },
  
  lifetimes:{
    attached(){
        console.log('评论组件挂载')
    },
},
observers: {
    'root': function(root) {
      console.log('root', root)
  
      let ATcontent = '';
  
      if ((root.replyid !== 0)&&(root.pid!==root.replyid)) {
        // ⚠️ 这里只是示例，你后面要换成真实查找逻辑
        const replyName = root.replyName || '小李';
  
            ATcontent = `@${replyName}`;
      }
  
      this.setData({
        ATcontent: ATcontent
      });
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {

  }
})