// pages/profile/profile.js
import { DEFAULT_AVATAR } from '../../constants/index.js'
import { getAvatar , updateUser} from '../../api/user';

Page({
  data: {
    editMode: false, // 是否可编辑
    user: {
      user_id:'',
      nick_name: '',
      avatar_url: '',
      student_id: '',
      gender: '男',
      phone_number: ''
    },
    genderOptions: ['保密','女', '男'],
    genderIndex: 0
  },

  // 切换编辑模式按钮
  handleToggleEdit() {
    if (this.data.editMode) {
      // 如果是编辑模式，点击按钮就是保存
      this.handleSave();
    }
    // 切换 editMode
    this.setData({ editMode: !this.data.editMode });
  },

  // 输入统一处理
  handleInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;

    this.setData({
      [`user.${field}`]: value
    });
  },

  // 性别选择
  handleGenderChange(e) {
    if (!this.data.editMode) return; // 非编辑模式不允许修改

    const index = e.detail.value;

    this.setData({
      genderIndex: index,
      'user.gender': this.data.genderOptions[index]
    });
  },

  // 选择头像
  handleChooseAvatar() {
    if (!this.data.editMode) return; // 非编辑模式不可修改头像

    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          'user.avatar': res.tempFilePaths[0]
        });
      }
    });
  },

  // 保存逻辑
  async handleSave() {
    const user = this.data.user;

    // if (!user.nickName || !user.studentId || !user.phoneNumber) {
    //   wx.showToast({
    //     title: '请填写完整信息',
    //     icon: 'none'
    //   });
    //   return;
    // }

    //console.log('提交数据：', user);

    wx.showToast({
      title: '保存成功'
    });

    // TODO：这里接接口
    try{
        const res=await updateUser(user)
        const data=res.data
        console.log('更新数据是否成功',data)
    }catch (err) {
        console.error('更新数据失败', err);
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    
  },

  // 跳转创建社团
  handleCreateClub() {
    wx.navigateTo({
      url: '/pages/newCommunity/newCommunity'
    });
  },

  // 页面加载
  onLoad: async function() {
    
    
    const userInfo = wx.getStorageSync('userInfo');
    ///console.log('进入个人中心', userInfo);
    const { userId } = userInfo || {};

    if (!userId) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    try {
      const res = await getAvatar(userId);
      const data=res.data
      console.log('个人中心头像数据', data);
    //     //user: {
    //   nickName: '',
    //   avatar: '',
    //   studentId: '',
    //   gender: '男',
    //   phoneNumber: ''
    // },

    //显示数据
      this.setData({
        'user.avatar_url': data.avatar_url,
        'user.nick_name': data.nick_name,
        'user.student_id':data.student_id,
        'user.gender':data.gender,
        'user.phone_number':data.phone_number,
        'user.user_id':data.user_id
      });

    } catch (err) {
      console.error('获取头像失败', err);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    }
  }
});