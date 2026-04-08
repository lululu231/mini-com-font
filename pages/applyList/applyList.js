Page({

    data: {
      tabs: [
        { key: 'all', label: '全部' },
        { key: 'pending', label: '待审核' },
        { key: 'approved', label: '已通过' },
        { key: 'rejected', label: '已拒绝' }
      ],
  
      currentTab: 'all',
  
      list: [],
      selectedIds: [],
  
      defaultAvatar: '/assets/default-avatar.png',
  
      statusMap: {
        pending: '待审核',
        approved: '已通过',
        rejected: '已拒绝'
      }
    },
  
    onLoad() {
      this.fetchList();
    },
  
    fetchList() {
      const data = [
        {
          id: 1,
          name: '张三',
          gender: 'male',
          phone: '13812345678',
          reason: '想学习技术',
          applyTime: '04-05',
          status: 'pending'
        }
      ];
  
      const list = data.map(item => ({
        ...item,
        maskPhone: this.maskPhone(item.phone)
      }));
  
      this.setData({ list });
    },
  
    switchTab(e) {
      this.setData({
        currentTab: e.currentTarget.dataset.key,
        selectedIds: []
      });
    },
  
    // 勾选
    toggleSelect(e) {
      const id = e.currentTarget.dataset.id;
      let { selectedIds } = this.data;
  
      if (selectedIds.includes(id)) {
        selectedIds = selectedIds.filter(i => i !== id);
      } else {
        selectedIds.push(id);
      }
  
      this.setData({ selectedIds });
    },
  
    // 单个通过
    approve(e) {
      this.updateStatus(e.currentTarget.dataset.id, 'approved');
    },
  
    reject(e) {
      this.updateStatus(e.currentTarget.dataset.id, 'rejected');
    },
  
    // 批量
    batchApprove() {
      this.batchUpdate('approved');
    },
  
    batchReject() {
      this.batchUpdate('rejected');
    },
  
    // 更新状态
    updateStatus(id, status) {
      const list = this.data.list.map(item => {
        if (item.id === id) item.status = status;
        return item;
      });
  
      this.setData({ list });
    },
  
    batchUpdate(status) {
      const { selectedIds } = this.data;
  
      const list = this.data.list.map(item => {
        if (selectedIds.includes(item.id)) {
          item.status = status;
        }
        return item;
      });
  
      this.setData({
        list,
        selectedIds: []
      });
    },
  
    // 脱敏
    maskPhone(phone) {
      return phone.slice(0,3) + '****' + phone.slice(7);
    }
  
  });