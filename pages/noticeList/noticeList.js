import  request from '../../utils/request';

Page({
  data: {
    topNotices: [],
    notices: []
  },

  onLoad() {
    this.fetchNotices();
  },

  // ✅ 获取公告（真实接口）
  async fetchNotices() {
    try {
      const res = await request({
        url: '/notice/list',
        method: 'GET',
        data: {
          community_id: wx.getStorageSync('curComId').id, // 👉 根据实际传
          page: 1,
          pageSize: 20
        }
      });

      // ✅ 数据转换（关键）
      const list = res.data.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        createTime: this.formatTime(item.created_at),
        isTop: item.type === 'top',
        read: false,
        showDetail: false,
        attachment: item.attachment
      }));

      // ✅ 拆分置顶 & 普通
      const top = list.filter(item => item.isTop);
      const normal = list.filter(item => !item.isTop);

      this.setData({
        topNotices: top,
        notices: normal
      });

    } catch (err) {
      console.error(err);
      wx.showToast({
        title: '获取公告失败',
        icon: 'none'
      });
    }
  },

  // ✅ 时间格式化
  formatTime(time) {
    const date = new Date(time);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}-${day}`;
  },
  toggleDetail(e) {
    const id = e.currentTarget.dataset.id;

    const updateList = list =>
      list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            showDetail: !item.showDetail,
            read: true
          };
        }
        return item;
      });

    this.setData({
      topNotices: updateList(this.data.topNotices),
      notices: updateList(this.data.notices)
    });
  }
});