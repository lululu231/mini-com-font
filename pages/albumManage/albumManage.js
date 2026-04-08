Page({
    data: {
      albumGroups: []
    },
  
    onLoad() {
      this.setData({
        albumGroups: [
          {
            id: 1,
            activityName: '迎新活动',
            photos: [
              { id: 11, url: 'https://picsum.photos/300/300?1' },
              { id: 12, url: 'https://picsum.photos/300/300?2' }
            ]
          }
        ]
      });
    },
  
    // 🆕 新建分组
    addGroup() {
      wx.showModal({
        title: '新建分组',
        editable: true,
        success: res => {
          if (res.confirm && res.content) {
            const newGroup = {
              id: Date.now(),
              activityName: res.content,
              photos: []
            };
  
            this.setData({
              albumGroups: [newGroup, ...this.data.albumGroups]
            });
          }
        }
      });
    },
  
    // 📤 上传照片
    uploadPhoto(e) {
      const groupId = e.currentTarget.dataset.id;
  
      wx.chooseImage({
        count: 9,
        success: res => {
          const tempFiles = res.tempFilePaths;
  
          const groups = this.data.albumGroups.map(g => {
            if (g.id === groupId) {
              const newPhotos = tempFiles.map((url, i) => ({
                id: Date.now() + i,
                url
              }));
              g.photos = [...g.photos, ...newPhotos];
            }
            return g;
          });
  
          this.setData({ albumGroups: groups });
        }
      });
    },
  
    // ❌ 删除单张
    deletePhoto(e) {
      const groupId = e.currentTarget.dataset.groupid;
      const photoId = e.currentTarget.dataset.photoid;
  
      wx.showModal({
        title: '确认删除该照片？',
        success: res => {
          if (res.confirm) {
            const groups = this.data.albumGroups.map(g => {
              if (g.id === groupId) {
                g.photos = g.photos.filter(p => p.id !== photoId);
              }
              return g;
            });
  
            this.setData({ albumGroups: groups });
          }
        }
      });
    },
  
    // ❌ 删除整组
    deleteGroup(e) {
      const groupId = e.currentTarget.dataset.id;
  
      wx.showModal({
        title: '确认删除整个分组？',
        content: '删除后不可恢复',
        success: res => {
          if (res.confirm) {
            const groups = this.data.albumGroups.filter(g => g.id !== groupId);
            this.setData({ albumGroups: groups });
          }
        }
      });
    },
  
    // 🔍 预览图片
    previewImage(e) {
      const url = e.currentTarget.dataset.url;
  
      wx.previewImage({
        current: url,
        urls: this.getAllUrls()
      });
    },
  
    getAllUrls() {
      return this.data.albumGroups.flatMap(g => g.photos.map(p => p.url));
    }
  });