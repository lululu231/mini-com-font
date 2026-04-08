// pages/noticeList/noticeList.js
Page({

    data: {
      topNotices: [],
      notices: []
    },
  
    onLoad() {
      this.fetchNotices();
    },
  
    // 获取公告
    fetchNotices() {
  
      const list = [
        {
          id: 1,
          title: '招新开始啦！',
          content: '欢迎新同学加入我们社团～',
          createTime: '04-05',
          isTop: true,
          read: false,
          showDetail: false
        },
        {
          id: 2,
          title: '周会通知',
          content: '本周三晚7点开会，请准时参加',
          createTime: '04-04',
          isTop: false,
          read: false,
          showDetail: false
        }
      ];
  
      const top = list.filter(item => item.isTop);
      const normal = list.filter(item => !item.isTop);
  
      this.setData({
        topNotices: top,
        notices: normal
      });
    },
  
    // 展开详情 + 标记已读
    toggleDetail(e) {
      const id = e.currentTarget.dataset.id;
  
      const updateList = list =>
        list.map(item => {
          if (item.id === id) {
            item.showDetail = !item.showDetail;
            item.read = true;
          }
          return item;
        });
  
      this.setData({
        topNotices: updateList(this.data.topNotices),
        notices: updateList(this.data.notices)
      });
    }
  
  });