Component({
    properties: {
      post: {
        type: Object,
        value: {}
      }
    },
    observers: {
        post(newVal) {
          console.log('组件内部post 更新了:', newVal) // 异步请求完成后会打印
        }
    },
    methods: {
        handleTap(){
            console.log('this.post.topicId',this.data.post)
            wx.navigateTo({
            url: `/pages/postPage/postPage?topicId=${this.data.post.topicId}`
            })
        }
    }
  })