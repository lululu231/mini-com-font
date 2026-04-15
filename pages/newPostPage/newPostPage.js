// pages/createPost/createPost.js
import  request from '../../utils/request';
import {BASE_URL} from "../../constants/index.js"

Page({

    data: {
        title: '',
        content: '',
        imageList: [],   // ✅ 改成数组（支持多图）
        communityList: [],
        selectedCommunityId: '',
        selectedCommunityName: ''
      },
  onLoad(){
    request({
        url:'/community/all',
        method:'GET',
      }).then((res)=>{
        console.log('teizires.data',res.data)
        this.setData({
            communityList:res.data
        })
      })
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
      console.log('index',index)
      const community=this.data.communityList[index]
  
      this.setData({
        selectedCommunityId: community.id,
        selectedCommunityName: community.community_name
      })
      //console.log('selectedCommunityId',this.data.selectedCommunityId,this.data.selectedCommunityName)
    },
  
    // 上传图片
    handleUpload() {
        wx.chooseImage({
          count: 5,
          success: (res) => {
            const newList = [...this.data.imageList, ...res.tempFilePaths]
      
            this.setData({
              imageList: newList.slice(0, 5) // 最多5张
            })
          }
        })
      },
      // ✅ 上传单张图片
uploadSingleImage(filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: BASE_URL + '/upload', // ⚠️ 你的后端接口
        filePath,
        name: 'file', // 后端接收字段名
        success: (res) => {
          const data = JSON.parse(res.data)
          resolve(data.url) // ✅ 返回图片URL
        },
        fail: reject
      })
    })
  },
  async uploadImages() {
    const { imageList } = this.data
  
    if (!imageList.length) return []
  
    const uploadTasks = imageList.map(path => this.uploadSingleImage(path))
  
    return Promise.all(uploadTasks) // ✅ 返回所有图片URL
  },
    // 提交
    async handleSubmit() {
        const { title, content, selectedCommunityId } = this.data
      
        if (!title.trim()) {
          wx.showToast({ title: '请输入标题', icon: 'none' })
          return
        }
      
        if (!content.trim()) {
          wx.showToast({ title: '请输入内容', icon: 'none' })
          return
        }
      
        if (!selectedCommunityId) {
          wx.showToast({ title: '请选择社团', icon: 'none' })
          return
        }
      
        wx.showLoading({ title: '发布中...' })
      
        try {
          // ✅ 1. 先上传图片
          const imageUrls = await this.uploadImages()
            console.log('imageUrls',imageUrls)
          // ✅ 2. 发帖
          const params = {
            community_id: selectedCommunityId,
            title,
            content,
            image_urls: imageUrls, // ✅ 传数组
            user_id: wx.getStorageSync('userInfo').userId
          }
      
          const res = await request({
            url: '/topic/create',
            method: 'POST',
            data: params
          })
      
          wx.hideLoading()
      
          if (res.code === 0) {
            wx.showToast({ title: '发布成功', icon: 'success' })
            setTimeout(() => wx.navigateBack(), 800)
          } else {
            wx.showToast({ title: res.message || '发布失败', icon: 'none' })
          }
      
        } catch (err) {
          wx.hideLoading()
          console.error(err)
      
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })
        }
      }
  
  })