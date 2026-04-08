// pages/publishNotice/publishNotice.js
Page({

    data: {
      title: '',
      content: '',
      noticeTypes: [
        { value: 'normal', label: '普通公告' },
        { value: 'top', label: '置顶公告' }
      ],
      selectedType: 'normal',
      selectedTypeLabel: '普通公告', // ✅ 新增
      publishRanges: [
        { value: 'all', label: '全体成员' },
        { value: 'department', label: '指定部门' }
      ],
      selectedRange: 'all',
      fileName: ''
    },
  
    onTitleInput(e) {
      this.setData({ title: e.detail.value });
    },
  
    onContentInput(e) {
      this.setData({ content: e.detail.value });
    },
  
    onTypeChange(e) {
        const index = e.detail.value;
        const item = this.data.noticeTypes[index];
      
        this.setData({
          selectedType: item.value,       // 提交用
          selectedTypeLabel: item.label   // 展示用
        });
      },
    chooseFile() {
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        success: res => {
          const tempFile = res.tempFiles[0];
          this.setData({ fileName: tempFile.name });
        }
      });
    },
  
    publishNotice() {
      const { title, content, selectedType, selectedRange, fileName } = this.data;
  
      if (!title || !content) {
        wx.showToast({ title: '标题和内容不能为空', icon: 'none' });
        return;
      }
  
      // 假设有一个接口来发布公告
      wx.request({
        url: 'https://example.com/api/publishNotice',
        method: 'POST',
        data: {
          title,
          content,
          type: selectedType,
          range: selectedRange,
          attachment: fileName
        },
        success: res => {
          wx.showToast({ title: '公告发布成功' });
          wx.navigateBack();
        },
        fail: err => {
          wx.showToast({ title: '发布失败，请重试', icon: 'none' });
        }
      });
    }
  });