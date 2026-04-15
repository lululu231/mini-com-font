// pages/forum/forum.js
import request from '../../utils/request';

Page({
  data: {
    curTab: 0,
    curcommunityId: 0, // ✅ 默认0表示全部
    tabList: [],
    postList: [],
    loading: false
  },

  // 根据 tab 获取 communityId
  curcommunityIdCheck(curTab) {
    const tab = this.data.tabList[curTab]
    console.log('tab',tab)
    return tab ? tab.id : 0
  },

  // 🔥 获取帖子列表（核心）
  getPostList() {
    const { curcommunityId } = this.data
    console.log('curcommunityId',curcommunityId)
    this.setData({ loading: true })

    request({
      url: '/topic/list',
      method: 'GET',
      data: {
        community_id: curcommunityId || 0
      }
    })
    .then(res => {
      console.log('帖子列表', res)

      
        this.setData({
          postList: res.data || []
        })
      
    })
    .catch(err => {
      console.error('获取帖子失败', err)

      wx.showToast({
        title: '网络错误',
        icon: 'none'
      })
    })
    .finally(() => {
      this.setData({ loading: false })
    })
  },

  // 点击 tab
  handleTabChange(e) {
    const { index, communityId } = e.detail
  
    this.setData({
      curTab: index,
      curcommunityId: communityId // ✅ 直接用子组件给的
    })
  
    this.getPostList()
  },
  // 创建新帖子
  newpostTap() {
    wx.navigateTo({
      url: '/pages/newPostPage/newPostPage',
    })
  },

  // 页面加载
  onLoad() {
    console.log('forum onLoad')

    // 1️⃣ 获取社团列表
    request({
      url: '/community/all',
      method: 'GET',
    })
    .then(res => {
      console.log('社团数据', res.data)

      const list = res.data || []

      this.setData({
        tabList: list,
        curcommunityId: list.length ? list[0].id : 0 // ✅ 默认选第一个
      })

      // 2️⃣ 拉帖子
      this.getPostList()
    })
  },

  // 页面显示（返回时刷新）
  onShow() {
    console.log('forum onShow')

    // 👉 返回页面刷新列表（发帖后）
    this.getPostList()
  }
})