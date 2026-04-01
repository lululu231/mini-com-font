//创建新社团
import request from '../../utils/request.js'
Page({
    data: {
        community_name: '',
        avatar_url: '',
        description: '',
        proofFilePath: '',
        proofFileName: ''
    },
  
    onInputChange(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({ [field]: e.detail.value });
    },
  
    chooseAvatar() {
      wx.chooseImage({
        count: 1,
        success: (res) => {
          this.setData({ avatar_url: res.tempFilePaths[0] });
        }
      });
    },
  
    deleteAvatar() {
      this.setData({ avatar_url: '' });
    },
  
    chooseProof() {
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        success: (res) => {
          this.setData({
            proofFilePath: res.tempFiles[0].path,
            proofFileName: res.tempFiles[0].name
          });
        }
      });
    },
  
    deleteProof() {
      this.setData({ proofFilePath: '', proofFileName: '' });
    },
    onLoad(){
        
    },
    submitCommunity() {
        const userInfo = wx.getStorageSync('userInfo');
        console.log('点击审核按钮', userInfo);
        const { userId } = userInfo || {};
      const { community_name, avatar_url, description, proofFilePath } = this.data;
  
      if (!community_name) {
        wx.showToast({ title: '社团名称不能为空', icon: 'none' });
        return;
      }
      if (!proofFilePath) {
        wx.showToast({ title: '请上传申请证明', icon: 'none' });
        return;
      }
  
      const uploadTasks = [];
  
      if (avatar_url) {
        uploadTasks.push(new Promise((resolve, reject) => {
          wx.uploadFile({
            url: 'http://localhost:3000/upload',
            filePath: avatar_url,
            name: 'file',
            // success(res) { resolve(JSON.parse(res.data).url); },
            success(res) {
                try {
                  const data = JSON.parse(res.data);
              
                  if (data.code !== 0) {
                    return reject(data.msg);
                  }
              
                  resolve(data.url);
                } catch (err) {
                  console.error('返回不是JSON:', res.data);
                  reject(err);
                }
              },
            fail(err) { reject(err); }
          });
        }));
      } else {
        uploadTasks.push(Promise.resolve(''));
      }
  
      uploadTasks.push(new Promise((resolve, reject) => {
        wx.uploadFile({
          url: 'http://localhost:3000/upload',
          filePath: proofFilePath,
          name: 'file',
        //   success(res) { resolve(JSON.parse(res.data).url); },
        success(res) {
            try {
              const data = JSON.parse(res.data);
          
              if (data.code !== 0) {
                return reject(data.msg);
              }
          
              resolve(data.url);
            } catch (err) {
              console.error('返回不是JSON:', res.data);
              reject(err);
            }
          },
          fail(err) { reject(err); }
        });
      }));
      console.log('avatarUrl, proofUrl',uploadTasks)
      Promise.all(uploadTasks).then(([avatarUrl, proofUrl]) => {
        request({
          url: '/community/apply',
          method: 'POST',
          data: {
            community_name:community_name,
            avatar_url: avatarUrl,
            description:description,
            proofUrl:proofUrl,
            status: 'pending',
            creator_id: userId,
          },
          success: (res) => {
            wx.showToast({ title: '提交成功', icon: 'success' });
          
            this.setData({
              community_name: '',
              avatar_url: '',
              description: '',
              proofFilePath: '',
              proofFileName: ''
            });
          },
          fail() {
            wx.showToast({ title: '提交失败', icon: 'none' });
          }
        });
      }).catch(() => {
        wx.showToast({ title: '文件上传失败', icon: 'none' });
      });
    }
  });