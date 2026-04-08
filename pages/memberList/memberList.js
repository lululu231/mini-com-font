import request from '../../utils/request.js';

Page({
  data: {
    communityId: null, // 当前社团ID，需要在页面跳转时传入
    members: [],
    defaultAvatar: '/assets/default-avatar.png',
  },

  onLoad(options) {
    // 社团ID来源可以是 options 或本地缓存
    const communityId = options.communityId || wx.getStorageSync('curComId')?.id;
    this.setData({ communityId });
    this.loadMembers();
  },

  // 请求后端接口获取成员
  loadMembers() {
    const { communityId } = this.data;
    if (!communityId) return;

    request({
      url: `/community/${communityId}/members`,
      method: 'GET'
    })
      .then(res => {
        console.log('members', res.data);
        const list = res.data.map(item => ({
          id: item.user_id,
          name: item.nick_name,
          avatar: item.avatar_url || this.data.defaultAvatar,
          gender: item.gender,
          department: item.department_name || '未分配',
          position: item.position || '普通成员',
          phone: item.phone_number || '',
          maskPhone: this.maskPhone(item.phone_number)
        }));

        this.setData({ members: list });
      })
      .catch(err => {
        console.error('获取成员失败', err);
        wx.showToast({ title: '加载成员失败', icon: 'none' });
      });
  },

  // 手机号脱敏
  maskPhone(phone) {
    if (!phone) return '';
    return phone.slice(0, 3) + '****' + phone.slice(7);
  }
});