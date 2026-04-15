import request from '../../utils/request.js';

Page({
  data: {
    list: [],
    category: 'all',
    loading: false
  },

  onLoad() {
    this.getList();
  },

  // ======================
  // 获取通知列表
  // ======================
  async getList() {
    this.setData({ loading: true });

    const res = await request({
      url: '/notification/list',
      method: 'GET',
      data: {
        category: this.data.category,
        userId : wx.getStorageSync('userInfo').userId
      }
    });

    if (res.code === 0) {
        const list = res.data.map(item => {
          return {
            ...item,
            created_at: this.formatTime(item.created_at)
          };
        });
      
        this.setData({
          list
        });
      }

    this.setData({ loading: false });
  },

  // ======================
  // 切换分类
  // ======================
  changeCategory(e) {
    const category = e.currentTarget.dataset.type;

    this.setData({
      category
    }, () => {
      this.getList();
    });
  },
  formatTime(dateStr) {
    const date = new Date(dateStr);
  
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
  
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
  
    return `${y}-${m}-${d} ${h}:${min}`;
  },
  // ======================
  // 标记已读
  // ======================
  async markRead(e) {
    const id = e.currentTarget.dataset.id;

    await request({
      url: '/notification/read',
      method: 'POST',
      data: { id }
    });

    // 本地更新状态（不用重新拉）
    const list = this.data.list.map(item => {
      if (item.id === id) {
        item.is_read = 1;
      }
      return item;
    });

    this.setData({ list });
  }
});