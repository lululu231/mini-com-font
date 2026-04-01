// pages/community/community.js
import request from '../../utils/request.js';

Page({
  data: {
    nowCommunity: {},            // 当前社团
    joinedCommunities: [],       // 已加入的社团列表
    showCommunityPanel: false,   // 是否展示切换面板
    solgan: '请选择社团',
    cardItem: [
      { itemID: 1, itemName: '社团成员', imgItem: '/assets/image/成员.png' },
      { itemID: 2, itemName: '社团活动', imgItem: '/assets/image/角色管理.png' },
      { itemID: 3, itemName: '群聊', imgItem: '/assets/image/通讯录.png' },
      { itemID: 4, itemName: '社团公告', imgItem: '/assets/image/通知.png' }
    ],
    admin1: 'ADMIN',
    admin0: 'USER'
  },

  onLoad() {
    this.fetchJoinedCommunities();
  },

  // 🔹 获取已加入社团（Promise .then 形式）
  fetchJoinedCommunities() {
    const userInfo = wx.getStorageSync('userInfo');
    const userId = userInfo ? userInfo.userId : null;

    if (!userId) {
      console.error('userId 未找到');
      return;
    }

    request({
      url: `/community/joined?userId=${userId}`,
      method: 'GET'
    }).then(res => {
      console.log('返回结果', res);
      if (res.code === 0) {
        this.setData({
          joinedCommunities: res.data,
          //nowCommunity: res.data[0] || {} // 默认选第一个社团
        });
      } else {
        console.error('获取已加入社团失败', res.msg);
      }
    }).catch(err => {
      console.error('接口请求出错', err);
    });
  },

  // 🔹 切换面板显示/隐藏
  toggleCommunityPanel() {
    this.setData({
      showCommunityPanel: !this.data.showCommunityPanel
    });
  },

  // 🔹 点击切换社团
  switchCommunity(e) {
    const id = e.currentTarget.dataset.id;
    const selected = this.data.joinedCommunities.find(item => item.id === id);
    if (selected) {
      this.setData({
        nowCommunity: selected,
        showCommunityPanel: false
      });
      this.refreshCommunityData(selected);
    }
  },

  // 🔹 切换社团后刷新数据
  refreshCommunityData(curCom) {
    // TODO: 调用各模块接口刷新数据
    console.log('curCom',curCom)
    this.setData({
       solgan:curCom.description
    })
  }
});