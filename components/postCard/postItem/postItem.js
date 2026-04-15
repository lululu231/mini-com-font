import {BASE_URL} from "../../../constants/index.js"
Component({
    properties: {
      post: {
        type: Object,
        value: {}
      }
    },
    data:{
        formattedTime:'',
        images: []
    },
    observers: {
        post(newVal) {
          if (!newVal) return      
          // 时间
          this.setData({
            formattedTime: this.formatTime(newVal.created_at)
          })
      
          // 图片处理（关键）
          let images = []

        try {
        const arr =
            typeof newVal.image_urls === 'string'
            ? JSON.parse(newVal.image_urls)
            : newVal.image_urls

        images = (arr || []).map(url => {
            if (!url) return ''
            if (url.startsWith('http')) return url
            return BASE_URL + url
        })

        } catch (e) {
        console.error('image_urls解析失败:', e)
        images = []
        }
      
          this.setData({
            images
          })
      
          console.log('处理后的 images:', this.data.images)
        }
      },

    methods: {
        formatTime(isoString) {
            const date = new Date(isoString)
          
            const pad = n => String(n).padStart(2, '0')
          
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
                   `${pad(date.getHours())}:${pad(date.getMinutes())}`
          },
        handleTap(){
            console.log('this.post.topicId',this.data.post)
            wx.navigateTo({
            url: `/pages/postPage/postPage?topicId=${this.data.post.topic_id}`
            })
        }
    }
  })