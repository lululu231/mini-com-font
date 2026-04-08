// pages/createDepartment/createDepartment.js
import wxRequest from '../../utils/request.js';

Page({
  data: {
    name: '',
    leaderId: null,
    leaderName: '',
    departmentId: null, // 新增：当前编辑的部门ID
    isEdit: false       // 是否是编辑模式
  },

  onLoad(options) {
    const { departmentId, data } = options || {};
  
    if (departmentId) {
      this.setData({
        departmentId,
        isEdit: true
      });
    }
  
    // ✅ 如果有传数据，直接回显（优先使用）
    if (data) {
      try {
        const dept = JSON.parse(decodeURIComponent(data));
  
        this.setData({
          name: dept.department_name || '',
          leaderId: dept.admin_id || null,
          leaderName: dept.admin_name || ''
        });
  
      } catch (e) {
        console.error('解析部门数据失败', e);
      }
    } else if (departmentId) {
      // ❗兜底：如果没传数据，再走接口
      this.loadDepartment(departmentId);
    }
  },

  // 输入部门名
  onNameChange(e) {
    this.setData({
      name: e.detail.value
    });
  },

  // 选择部长
  selectLeader() {
    wx.navigateTo({
      url: '/pages/memberSelect/memberSelect?type=leader'
    });
  },


  // 根据ID加载部门信息（编辑回显）
  loadDepartment(id) {
    wxRequest({
      url: `/department/detail/${id}`,
      method: 'GET'
    })
    .then(res => {
      const data = res.data;
      this.setData({
        name: data.department_name || '',
        leaderId: data.admin_id || null,
        leaderName: data.admin_name || '',
      });
    })
    .catch(err => {
      console.error('获取部门信息失败', err);
      wx.showToast({
        title: '获取部门信息失败',
        icon: 'none'
      });
    });
  },

  // 提交
  handleSubmit() {
    const { name, leaderId,  departmentId, isEdit } = this.data;

    if (!name.trim()) {
      wx.showToast({
        title: '请输入部门名称',
        icon: 'none'
      });
      return;
    }

    const comInfo = wx.getStorageSync('curComId');
    const payload = {
      department_name: name,
      community_id: comInfo.id,
      admin_id: leaderId || null,
    };

    // ❗ 区分新建和编辑
    const url = isEdit ? `/department/update/${departmentId}` : '/department/create';
    const method = isEdit ? 'PUT' : 'POST';

    wxRequest({
      url,
      method,
      data: payload
    })
    .then(res => {
      wx.showToast({
        title: res.message || (isEdit ? '更新成功' : '创建成功'),
        icon: 'success'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 800);
    })
    .catch(err => {
      console.error(isEdit ? '更新部门失败' : '创建部门失败', err);
    });
  }
});