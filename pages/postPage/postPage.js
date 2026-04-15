// pages/postPage/postPage.js
import request from '../../utils/request.js' // 👈 你的封装请求

Page({

  data: {
    post: {},   // 帖子详情
    loading: false
  },

  onLoad(options) {
    const { topicId } = options

    console.log('进入postPage', topicId)

    if (!topicId) {
      wx.showToast({
        title: '缺少topicId',
        icon: 'none'
      })
      return
    }

    this.getPostDetail(topicId)
  },

  // 获取帖子详情
  async getPostDetail(topicId) {
    this.setData({ loading: true })

    try {
      const res = await request({
        url: `/topic/${topicId}`,
        method: 'GET'
      })

      console.log('帖子详情返回:', res)

      if (res.code === 0) {
        this.setData({
          post: res.data
        })
      } else {
        wx.showToast({
          title: res.message || '获取失败',
          icon: 'none'
        })
      }

    } catch (error) {
      console.error('请求失败:', error)

      wx.showToast({
        title: '网络错误',
        icon: 'none'
      })

    } finally {
      this.setData({ loading: false })
    }
  }
})