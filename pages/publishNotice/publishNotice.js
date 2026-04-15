// pages/publishNotice/publishNotice.js
import request from '../../utils/request.js';
import {BASE_URL} from "../../constants/index.js"

Page({

    data: {
      title: '',
      content: '',
      noticeTypes: [
        { value: 'normal', label: '普通公告' },
        { value: 'top', label: '置顶公告' }
      ],
      selectedType: 'normal',
      selectedTypeLabel: '普通公告',
      fileName: '',
      fileUrl:''
    },
  
    // 标题输入
    onTitleInput(e) {
      this.setData({ title: e.detail.value });
    },
  
    // 内容输入
    onContentInput(e) {
      this.setData({ content: e.detail.value });
    },
  
    // 公告类型选择
    onTypeChange(e) {
      const index = e.detail.value;
      const item = this.data.noticeTypes[index];
  
      this.setData({
        selectedType: item.value,
        selectedTypeLabel: item.label
      });
    },
  
    // 选择附件
    chooseFile() {
        wx.chooseMessageFile({
          count: 1,
          type: 'file',
          success: res => {
            const tempFile = res.tempFiles[0];
      
            // ✅ 上传文件
            wx.uploadFile({
                url: BASE_URL + '/upload',   // 👉 你后端上传接口
              filePath: tempFile.path,
              name: 'file',
      
              success: uploadRes => {
                const data = JSON.parse(uploadRes.data);
      
                if (data.code === 0) {
                  this.setData({
                    fileName: tempFile.name,  // 展示用
                    fileUrl: data.url         // ✅ 真正提交用
                  });
      
                  wx.showToast({ title: '上传成功' });
                } else {
                  wx.showToast({
                    title: '上传失败1',
                    icon: 'none'
                  });
                }
              },
      
              fail: () => {
                wx.showToast({
                  title: '上传失败2',
                  icon: 'none'
                });
              }
            });
          }
        });
      },
  
    // 发布公告
    async publishNotice() {
        const { title, content, selectedType, fileUrl } = this.data;
      
        if (!title || !content) {
          wx.showToast({
            title: '标题和内容不能为空',
            icon: 'none'
          });
          return;
        }
      
        try {
          const res = await request({
            url: '/notice/create', // ❗必须完整路径
            method: 'POST',
            data: {
                community_id:wx.getStorageSync('curComId').id,
              title,
              content,
              type: selectedType,
              attachment: fileUrl,
              creator_id: wx.getStorageSync('userInfo').userId
            }
          });
      
          console.log('成功返回：', res);
      
          wx.showToast({ title: '公告发布成功' });
      
          setTimeout(() => {
            wx.navigateBack();
          }, 800);
      
        } catch (err) {
          console.error('请求失败：', err);
      
          wx.showToast({
            title: err.message || '发布失败',
            icon: 'none'
          });
        }
      }
  
  });