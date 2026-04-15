import request from '../../utils/request.js';

Page({
  data: {
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'pending', label: '待审核' },
      { key: 'joined', label: '已通过' },
      { key: 'reject', label: '已拒绝' }
    ],

    currentTab: 'all',
    list: [],
    selectedIds: [],

    communityId: 1,

    statusMap: {
      pending: '待审核',
      joined: '已通过',
      reject: '已拒绝'
    }
  },

  onLoad(options) {
    //const communityId = wx.getStorageSync('curComId')?.id
    ////console.log('communityIdcommunityIdcommunityIdcommunityId',communityId)
    if (options.communityId) {
      this.setData({ communityId: options.communityId })
    }

    this.fetchList()
  },

  // ======================
  // 获取列表（Promise版）
  // ======================
  async fetchList() {
    const { currentTab } = this.data
    const communityId = wx.getStorageSync('curComId')?.id
   // console.log('communityIdFetch',communityId)
    try {
      const res = await request({
        url: '/community/pendingMemberList',
        method: 'GET',
        data: {
          communityId,
          status: currentTab
        }
      })

      let list = res.data || []

      //console.log('接口返回:', res)

      list = list.map(item => ({
        id: item.user_id,
        name: item.nick_name,
        avatar: item.avatar_url,
        phone: this.maskPhone(item.phone_number || ''),
        status: item.status,
        applyTime: item.join_time
      }))

      this.setData({ list })

    } catch (err) {
      console.error('获取列表失败:', err)
    }
  },

  // ======================
  // 切换 tab
  // ======================
  switchTab(e) {
    const key = e.currentTarget.dataset.key

    this.setData({
      currentTab: key,
      selectedIds: []
    }, () => {
      this.fetchList()
    })
  },

  // ======================
  // 勾选
  // ======================
  toggleSelect(e) {
    const id = e.currentTarget.dataset.id
    let { selectedIds } = this.data

    if (selectedIds.includes(id)) {
      selectedIds = selectedIds.filter(i => i !== id)
    } else {
      selectedIds.push(id)
    }

    this.setData({ selectedIds })
  },

  // ======================
  // 单个审核（Promise版）
  // ======================
  async auditUser(userId, action) {
    const communityId = wx.getStorageSync('curComId')?.id
    //console.log('communityIdauditUser',communityId)
    await request({
      url: '/community/audit',
      method: 'POST',
      data: {
        communityId,
        userId,
        action
      }
    })

    this.fetchList()
  },

  approve(e) {
    const id = e.currentTarget.dataset.id
    this.auditUser(id, 'approve')
  },

  reject(e) {
    const id = e.currentTarget.dataset.id
    this.auditUser(id, 'reject')
  },

  // ======================
  // 批量审核（Promise版）
  // ======================
  async batchUpdate(action) {
    const { selectedIds } = this.data
    const communityId = wx.getStorageSync('curComId')?.id
    console.log('communityIdbatchUpdate',communityId)
    try {
      await Promise.all(
        selectedIds.map(userId =>
          request({
            url: '/community/audit',
            method: 'POST',
            data: {
              communityId,
              userId,
              action
            }
          })
        )
      )

      this.setData({ selectedIds: [] })
      this.fetchList()

    } catch (err) {
      console.error('批量审核失败:', err)
    }
  },

  batchApprove() {
    this.batchUpdate('approve')
  },

  batchReject() {
    this.batchUpdate('reject')
  },

  // ======================
  // 脱敏
  // ======================
  maskPhone(phone) {
    if (!phone) return ''
    return phone.slice(0, 3) + '****' + phone.slice(-4)
  }
})