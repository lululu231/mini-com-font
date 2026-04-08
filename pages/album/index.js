Page({
    data: {
      albumGroups: []
    },
  
    onLoad() {
      // 模拟数据
      this.setData({
        albumGroups: [
          {
            id: 1,
            activityName: '迎新活动',
            cover: 'https://picsum.photos/400/300?1',
            photos: [
              'https://picsum.photos/300/300?1',
              'https://picsum.photos/300/300?2',
              'https://picsum.photos/300/300?3'
            ]
          },
          {
            id: 2,
            activityName: '篮球比赛',
            cover: 'https://picsum.photos/400/300?4',
            photos: [
              'https://picsum.photos/300/300?4',
              'https://picsum.photos/300/300?5'
            ]
          }
        ]
      });
    },
  
    goDetail(e) {
      const group = e.currentTarget.dataset.group;
  
      wx.navigateTo({
        url: `/pages/album/detail?group=${encodeURIComponent(JSON.stringify(group))}`
      });
    }
  });