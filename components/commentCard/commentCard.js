// components/commentCard/commentCard.js
import { mockCommentsTree } from "./mock.js"
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
        commentTree:[],
  },
  lifetimes:{
    attached(){
        ///获取评论数据----接api
        this.setData({
            commentTree:mockCommentsTree
        })
        console.log('commentTree',this.data.commentTree)
       }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})