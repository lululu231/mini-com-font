Page({
    data: {
      group: {}
    },
  
    onLoad(options) {
      const group = JSON.parse(decodeURIComponent(options.group));
      this.setData({ group });
    },
  
    previewImage(e) {
      const index = e.currentTarget.dataset.index;
      const urls = this.data.group.photos;
  
      wx.previewImage({
        current: urls[index],
        urls
      });
    }
  });