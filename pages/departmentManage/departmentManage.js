// pages/departmentManage/departmentManage.js
import request from '../../utils/request.js';

Page({
  data: {
    departments: []
  },

  onLoad() {
    this.fetchDepartments();
  },
  onShow() {
    this.fetchDepartments();
  },
  // ✅ 获取部门列表
  // fetchDepartments 修正
  fetchDepartments() {
    const comInfo = wx.getStorageSync('curComId'); 
    if (!comInfo?.id) {
      wx.showToast({ title: '社团信息缺失', icon: 'none' });
      return;
    }
  
    request({
      url: `/department/${comInfo.id}`, 
      method: 'GET'
    })
      .then(res => {
        // ✅ 这里 res.data 就是后端返回的部门列表
        console.log('部门接口返回:', res);
        this.setData({ departments: res.data || [] });
      })
      .catch(err => {
        console.error('获取部门列表失败', err);
        // 封装里已经弹过 toast，可选是否重复弹
      });
  },

  // ✅ 新建部门
  goCreateDepartment() {
    wx.navigateTo({
      url: '/pages/createDepartment/createDepartment'
    });
  },

  // ✅ 查看详情
  goDepartmentDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/departmentDetail/departmentDetail?id=${id}`
    });
  },

  // ✅ 编辑
  handleEdit(e) {
    const id = Number(e.currentTarget.dataset.id); // ✅ 转数字
  
    const department = this.data.departments.find(
      item => item.department_id === id
    );
  
    if (!department) {
      console.log('当前列表:', this.data.departments);
      console.log('点击ID:', id);
      wx.showToast({ title: '部门数据不存在', icon: 'none' });
      return;
    }
  
    const dataStr = encodeURIComponent(JSON.stringify(department));
  
    wx.navigateTo({
      url: `/pages/createDepartment/createDepartment?departmentId=${id}&data=${dataStr}`
    });
  },

  // ✅ 解散部门
  handleDelete(e) {
    const id = e.currentTarget.dataset.id;

    wx.showModal({
      title: '提示',
      content: '确定要解散该部门吗？',
      success: (res) => {
        if (res.confirm) {
          this.deleteDepartment(id);
        }
      }
    });
  },

  // 调后端接口删除部门
  deleteDepartment(id) {
    request({
        url: `/department/dissolve/${id}`,
        method: 'PUT'
    })
      .then(res => {
        // 删除成功，直接更新前端列表
        this.fetchDepartments(); // ✅ 推荐
        wx.showToast({ title: '已解散', icon: 'success' });
      })
      .catch(err => {
        console.error('删除部门失败', err);
        // 封装已弹 toast
      });
  }
});