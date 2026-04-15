// index.js
import {BASE_URL} from "../../constants/index.js"

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import request  from '../../utils/request.js'
Page({
  data: {
    motto: '登录',
    userInfo: {
      userid:'',
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  onLoad() {
    // 1. 从本地缓存读取用户信息
    const userInfo = wx.getStorageSync('userInfo')
    //console.log('getStorageSync',userInfo)
   //console.log('onLoad')
    // 2. 判断是否存在（是否登录过）
    if (userInfo) {
      //console.log('已登录用户1：', userInfo)
  
      // 3. 回显到页面
      this.setData({
        userInfo: {
          userid: userInfo.userid || '',
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName
        },
        hasUserInfo: true
      })
    }
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
    //console.log('触发bindViewTap函数')
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
  
    wx.uploadFile({
    url: BASE_URL + '/upload', // 改成你的后端地址
    filePath: avatarUrl,
    name: 'file',
      success: (res) => {
        const data = JSON.parse(res.data)
  
        const url = BASE_URL+data.url // 后端返回的图片地址
        console.log('indexAv',url)
        const { nickName } = this.data.userInfo
        
        this.setData({
          "userInfo.avatarUrl": url,
          hasUserInfo: nickName && url && url !== defaultAvatarUrl,
        })
      },
      fail: (err) => {
        console.log('头像上传失败', err)
        wx.showToast({
          title: '头像上传失败',
          icon: 'none'
        })
      }
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        //console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  userLogin() {
    //console.log('点击登录')  
    //校验
    // if (!nickName || avatarUrl === defaultAvatarUrl) {
    //   wx.showToast({
    //     title: '请先选择头像并输入昵称',
    //     icon: 'none'
    //   })
    //   return
    // }
  
    // ✅ 已经填写了昵称和头像，才执行登录
    wx.login({
        success: (res) => {
          request({
            url: '/login',
            method: 'POST',
            data: {
              code: res.code,
              nickName: this.data.userInfo.nickName,
              avatarUrl: this.data.userInfo.avatarUrl
            }
          })
          .then((res) => {
            //console.log('真正业务数据：', res.data)
    
            wx.setStorageSync('userInfo', res.data)
    
            wx.switchTab({
              url: '/pages/mainPage/mainPage'
            })
          })
          .catch((err) => {
            console.log('登录失败：', err)
          })
        }
      })
  }
})
