Component({
    properties: {
      postList: {
        type: Array,
        value: []
      }
    },
  
    lifetimes: {
      attached() {
        console.log('postList 是否传入：', this.properties.postList)
      }
    },
    observers: {
        postList(newVal) {
          console.log('postList 更新了:', newVal) // 异步请求完成后会打印
        }
      },
  
    methods: {
      
    }
  })