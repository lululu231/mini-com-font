// pages/allCommunity/allCommunity.js
import request from '../../utils/request.js';
// 防抖函数，可放到 utils/util.js
function debounce(fn, delay = 300) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
Page({
    data: {
        communities: [],
        keyword: '' // 搜索关键词
    },

  onLoad() {
    this.fetchAllCommunities();
  },

  fetchAllCommunities(keyword = '') {
    const userInfo = wx.getStorageSync('userInfo');
    const userId = userInfo?.userId;

    request({
      url: `/community/allWithRelation`,
      method: 'GET',
      data: { userId, keyword }
    })
      .then(res => {
        if (res.code === 0) {
          this.setData({
            communities: res.data
          });
        }
      })
      .catch(err => console.error(err));
  },

  // 搜索事件
  onSearchInput: debounce(function(e) {
    console.log('e.detail',e.detail )
    const keyword = e.detail || ''; // ✅ undefined 转为空字符串
    this.setData({ keyword });
    console.log('keyword',this.data.keyword)
    this.fetchAllCommunities(keyword);
  }, 300),


  // 点击进入社团主页
  enterCommunity(e) {
    const id = e.currentTarget.dataset.id;
    console.log('触发了enter')
    wx.navigateTo({
      url: `/pages/communityHome/communityHome?communityId=${id}`
    });
  },

  // 点击加入
  handleJoin(e) {
    const id = e.currentTarget.dataset.id;
    const userId = wx.getStorageSync('userInfo').userId;
  
    request({
      url: `/community/join`,
      method: 'POST',
      data: {
        community_id: id,
        user_id: userId
      }
    }).then(res => {
  
      if (res.code === 0) {
  
        wx.showToast({ title: '申请成功', icon: 'success' });
  
        // ✅ 改为审核中
        const communities = this.data.communities.map(c => {
          if (c.id === id) {
            return { ...c, relation: 'pending' };
          }
          return c;
        });
  
        this.setData({ communities });
  
      } else {
        wx.showToast({ title: res.msg, icon: 'none' });
      }
    });
  }
});