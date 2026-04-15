import request from '../../utils/request.js'
import {BASE_URL} from "../../constants/index.js"

Page({
    data: {
        albumGroups: [],
        community_id: 1,
        albumId:0,
        currentAlbumId: null, // 👈 当前进入的相册
        photos: []            // 👈 当前相册照片
      },
  //展示相册列表
    onLoad() {
        const community_id=wx.getStorageSync('curComId').id
        this.setData({community_id})
        this.loadAlbumList();
      },
  
    // 🆕 新建分组
    addGroup() {
        wx.showModal({
          title: '新建分组',
          editable: true,
          success: (res) => {
            if (res.confirm && res.content) {
      
              request({
                url: '/album/create',
                method: 'POST',
                data: {
                  community_id: this.data.community_id,
                  album_name: res.content,
                  creator_id: 'user_id'
                }
              })
              .then(res => {
                if (res.code === 0) {
                  wx.showToast({ title: '创建成功' });
                  this.loadAlbumList();
                }
              })
              .catch(err => console.error(err));
      
            }
          }
        });
      },
      uploadPhoto(e) {
        const groupId = e.currentTarget.dataset.id;
      
        wx.chooseImage({
          count: 9,
          success: res => {
            const files = res.tempFilePaths;
      
            let uploadCount = 0;
      
            files.forEach(filePath => {
              wx.uploadFile({
                // ✅ 改这里（最关键）
                url: BASE_URL + '/photo/upload',
      
                filePath,
                name: 'file',
      
                formData: {
                  album_id: groupId,
                  community_id: this.data.community_id,
                  uploader_id: 'user_id'
                },
      
                success: (res) => {
                  const data = JSON.parse(res.data);
      
                  console.log('上传返回:', data);
      
                  // data.data = { photo_id, image_url }
      
                  uploadCount++;
      
                  if (uploadCount === files.length) {
                    this.loadAlbumList();
                    wx.showToast({
                      title: '上传成功',
                      icon: 'success'
                    });
                  }
                  this.loadPhotos(this.data.albumId);
                },
      
                fail: (err) => {
                  console.log('图片上传失败', err);
                  wx.showToast({
                    title: '图片上传失败',
                    icon: 'none'
                  });
                }
              });
            });
          }
        });
      },
  
    // ❌ 删除单张
    deletePhoto(e) {
        const photoId = e.currentTarget.dataset.photoid;
      
        wx.showModal({
          title: '确认删除该照片？',
          success: (res) => {
            if (res.confirm) {
      
              request({
                url: `/photo/${photoId}`,
                method: 'DELETE'
              })
              .then(res => {
                if (res.code === 0) {
                  wx.showToast({ title: '删除成功' });
                  this.loadPhotos(this.data.albumId);
                }
                
              })
              .catch(err => console.error(err));
      
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
          success: (res) => {
            if (res.confirm) {
      
              request({
                url: `/album/${groupId}`,
                method: 'DELETE'
              })
              .then(res => {
                if (res.code === 0) {
                  wx.showToast({ title: '删除成功' });
                  this.loadAlbumList();
                }
              })
              .catch(err => console.error(err));
      
            }
          }
        });
      },
      loadPhotos(albumId) {
        console.log('albumId',albumId)
        request({
          url: `/album/${albumId}/photos`,
          method: 'GET'
        })
        .then(res => {
          if (res.code === 0) {
            this.setData({
              photos: res.data.map(p => ({
                id: p.photo_id,
                url: p.image_url ? BASE_URL + p.image_url : ''
            }))
            });
          }
          console.log(this.data.photos[0].url)
        })
        .catch(err => console.error(err));
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
        return this.data.photos.map(item => item.url);
      },
    backToList() {
        this.setData({
          currentAlbumId: null,
          photos: []
        });
      },
      enterAlbum(e) {
        const albumId = e.currentTarget.dataset.id;
        console.log('enterAlum',albumId,e.currentTarget)
        this.setData({
            albumId:albumId,
          currentAlbumId: albumId,
          photos: []
        });
      
        this.loadPhotos(albumId);
      },
  //加载album列表
    loadAlbumList() {
        console.log('this.data.community_id',this.data.community_id)
        request({
          url: '/album/list',
          method: 'GET',
          data: {
            community_id: this.data.community_id
          }
        })
        .then(res => {
            console.log('resalbum',res)
          if (res.code === 0) {
      
            const albumGroups = res.data.map(item => ({
                id: item.album_id,
                activityName: item.album_name,
                cover: item.cover_url ? BASE_URL + item.cover_url : '',
                photos: []
              }));
      
            this.setData({ albumGroups });
          }
        })
        .catch(err => console.error(err));
      }
  });