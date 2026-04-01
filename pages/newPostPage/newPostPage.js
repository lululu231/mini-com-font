// pages/createPost/createPost.js
Page({

    data: {
      title: '',              // 标题
      content: '',            // 内容
      imageUrl: '',           // 图片路径
      communityList: [        // 模拟社团数据
        { id: 'c001', name: '前端社区' },
        { id: 'c002', name: '后端社区' }
      ],
      selectedCommunityId: '',     // 选中的社团id
      selectedCommunityName: ''    // 选中的社团名称
    },
  
    // 标题输入
    handleTitleInput(e) {
      this.setData({
        title: e.detail.value
      })
    },
  
    // 内容输入
    handleContentInput(e) {
      this.setData({
        content: e.detail.value
      })
    },
  
    // 选择社团
    handleCommunityChange(e) {
      const index = e.detail.value   // 选中的索引
      const community = this.data.communityList[index]
  
      this.setData({
        selectedCommunityId: community.id,
        selectedCommunityName: community.name
      })
    },
  
    // 上传图片
    handleUpload() {
      wx.chooseImage({
        count: 1, // 只选一张
        success: (res) => {
          this.setData({
            imageUrl: res.tempFilePaths[0]
          })
        }
      })
    },
  
    // 提交
    handleSubmit() {
      const { title, content, selectedCommunityId } = this.data
  
      // 校验标题
      if (!title.trim()) {
        wx.showToast({
          title: '请输入标题',
          icon: 'none'
        })
        return
      }
  
      // 校验内容
      if (!content.trim()) {
        wx.showToast({
          title: '请输入内容',
          icon: 'none'
        })
        return
      }
  
      // 校验社团
      if (!selectedCommunityId) {
        wx.showToast({
          title: '请选择社团',
          icon: 'none'
        })
        return
      }
  
      // 模拟提交数据
      const postData = this.data
  
      console.log('提交数据：', postData)
  
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      })
    }
  
  })