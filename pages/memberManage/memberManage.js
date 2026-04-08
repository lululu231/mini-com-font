import request from '../../utils/request.js';

Page({
  data: {
    role: '社长',
    showDeptModal: false,
    selectedUserId: null,
    selectedDeptId: null,
    communityId: null,

    departments: [],
    currentDeptId: null,
    currentDeptName: '',

    members: []
  },

  onLoad() {
    const community = wx.getStorageSync('curComId');
    const communityId = community?.id || null;
    this.setData({ communityId });
    this.initData();
  },

  initData() {
    this.fetchDepartments()
      .then(() => this.fetchMembers())
      .catch(err => console.error('初始化失败', err));
  },

  // 获取部门列表
  fetchDepartments() {
    const { communityId } = this.data;
    return request({
      url: `/department/${communityId}`,
      method: 'GET'
    }).then(res => {
      const list = res.data || [];
      const newList = [{ department_id: null, department_name: '全部成员' }, ...list];

      this.setData({
        departments: newList,
        currentDeptId: null,
        currentDeptName: '全部成员'
      });
    });
  },

  // 获取成员
  fetchMembers() {
    const { communityId, currentDeptId } = this.data;
    let url = `/community/${communityId}/members`;
    if (currentDeptId) url += `?departmentId=${currentDeptId}`;

    return request({ url, method: 'GET' }).then(res => {
        console.log('members',res.data)
      this.setData({ members: res.data || [] });
    });
  },

  // 点击“调部门”按钮，打开弹框
  changeDept(e) {
    const userId = e.currentTarget.dataset.id; // 选中成员的 id

    console.log(' e.currentTarget.dataset', e)
    this.setData({
      showDeptModal: true,
      selectedUserId: userId,
      selectedDeptId: null // 每次打开重置
    });
  },

  // 选择部门（弹框里）
  selectDept(e) {
    const deptId = e.currentTarget.dataset.id;
    this.setData({ selectedDeptId: deptId });
  },

  // 关闭弹框
  closeDeptModal() {
    this.setData({ showDeptModal: false });
  },

  // 确认修改部门
  confirmChangeDept() {

    const { selectedUserId, selectedDeptId, communityId } = this.data;
    console.log('wx.getStorageSync',wx.getStorageSync('userInfo').userId,selectedUserId,selectedDeptId,communityId)
    
    const operatorUserId=wx.getStorageSync('userInfo').userId
    if (!selectedDeptId) {
      wx.showToast({ title: '请选择部门', icon: 'none' });
      return;
    }

    request({
      url: `/community/changeDepartment`,
      method: 'POST',
      data: {
        communityId,
        userId: selectedUserId,
        departmentId: selectedDeptId,
        operatorUserId
      }
    }).then(() => {
      wx.showToast({ title: '修改成功' });
      this.setData({ showDeptModal: false });
      this.fetchMembers(); // 刷新成员列表
    }).catch(() => {
      wx.showToast({ title: '操作失败', icon: 'none' });
    });
  },

  // 顶部部门筛选
  onDeptChange(e) {
    const index = e.detail.value;
    const dept = this.data.departments[index];
    this.setData({
      currentDeptId: dept.department_id,
      currentDeptName: dept.department_name
    });
    this.fetchMembers();
  },

  // 设部长
  setLeader(e) {
    const userId = e.currentTarget.dataset.id;
    const { communityId, currentDeptId } = this.data;

    wx.showModal({
      title: '提示',
      content: '确定设为部长？',
      success: (res) => {
        if (res.confirm) {
          request({
            url: `/community/setLeader`,
            method: 'POST',
            data: { communityId, userId, departmentId: currentDeptId }
          }).then(() => {
            wx.showToast({ title: '设置成功' });
            this.fetchMembers();
          });
        }
      }
    });
  },

  // 踢出成员
  kickMember(e) {
    const userId = e.currentTarget.dataset.id;
    const { communityId } = this.data;

    wx.showModal({
      title: '确认移除',
      content: '确定要将该成员移出社团吗？',
      success: (res) => {
        if (res.confirm) {
          request({
            url: `/community/kickMember`,
            method: 'POST',
            data: { communityId, userId }
          }).then(() => {
            wx.showToast({ title: '已移除', icon: 'success' });
            this.fetchMembers();
          }).catch(() => {
            wx.showToast({ title: '操作失败', icon: 'none' });
          });
        }
      }
    });
  }
});