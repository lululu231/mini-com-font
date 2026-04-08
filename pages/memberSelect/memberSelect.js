import request from '../../utils/request.js';

Page({
  data: {
    
    memberList: [],
    selectedId: null,
    communityId: null   // 当前社团ID
  },

  onLoad() {
    
    const communityId = wx.getStorageSync('curComId').id; // 假设从上一页传过来
    console.log('communityId',communityId)
    this.setData({
      communityId,
    });

    this.loadMembers();
  },

  // 调接口获取社团成员
  loadMembers() {
    const { communityId } = this.data;
    if (!communityId) return;

    request({
      url: `/community/${communityId}/members`,
      method: 'GET'
    }).then(res => {
      // res.data 是后端返回的成员列表
      console.log('打印成员',res.data)
      const list = res.data.map(item => ({
        id: item.user_id,
        name: item.nick_name,
        avatar: item.avatar_url || 'https://picsum.photos/100', // 默认头像
        position: item.position || '普通成员',
        department: item.department_name || ''
      }));

      this.setData({ memberList: list });
    }).catch(err => {
      console.error('获取成员失败', err);
      wx.showToast({ title: '加载成员失败', icon: 'none' });
    });
  },

  // 选择成员
  selectMember(e) {
    const item = e.currentTarget.dataset.item;

    this.setData({ selectedId: item.id });

    // 返回上一页并传值
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
      prevPage.setData({
        leaderId: item.id,
        leaderName: item.name
      });
    

    wx.navigateBack();
  }
});