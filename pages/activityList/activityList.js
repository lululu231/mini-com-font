// pages/activity/activity.js
import request from '../../utils/request.js';

Page({
  data: {
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'upcoming', label: '未开始' },
      { key: 'ongoing', label: '进行中' },
      { key: 'ended', label: '已结束' }
    ],
    currentTab: 'all',
    activities: [],
    statusMap:{
        'upcoming': '未开始',
        'ongoing': '进行中',
        'ended': '已结束'
    },
    communityId:1
  },

  onLoad() {
    this.fetchActivities();
  },

  switchTab(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ currentTab: key });
    this.fetchActivities();
  },
  joinActivity(e) {
    const eventId = e.currentTarget.dataset.id;
    console.log('eventId',eventId)
    const userId = wx.getStorageSync('userInfo').userId; // ✅ 从缓存拿
    console.log('userId',userId)
    request({
      url: '/event/join',
      method: 'POST',
      data: {
        eventId,
        userId
      }
    })
      .then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: '报名成功',
            icon: 'success'
          });
  
          this.fetchActivities();
        } else {
          wx.showToast({
            title: res.message || '报名失败',
            icon: 'error'
          });
        }
      })
      .catch(err => {
        console.error(err);
        wx.showToast({
          title: '报名失败',
          icon: 'error'
        });
      });
  },
  cancelActivity(e) {
    const eventId = e.currentTarget.dataset.id;
    const userId = wx.getStorageSync('userInfo').userId;
  
    request({
      url: '/event/cancelEvent', // ✅ 改成你的新接口
      method: 'POST',
      data: {
        eventId,
        userId
      }
    })
      .then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: '已取消报名',
            icon: 'success'
          });
  
          this.fetchActivities();
        } else {
          wx.showToast({
            title: res.message || '取消失败',
            icon: 'error'
          });
        }
      })
      .catch(err => {
        console.error(err);
        wx.showToast({
          title: '取消失败',
          icon: 'error'
        });
      });
  },
  toggleDetail(e) {
    const id = e.currentTarget.dataset.id;
    const activities = this.data.activities.map(item => {
      if (item.id === id) {
        // 点击同一个卡片收起/展开
        return { ...item, showDetail: !item.showDetail };
      } else {
        // 其他卡片收起
        return { ...item, showDetail: false };
      }
    });
  
    this.setData({ activities });
  },
  fetchActivities() {
    const { currentTab } = this.data;

    request({
      url: '/event/all', // ✅ 相对路径
      method: 'GET',
      data: {
        status: 'approved' ,// 只查审核通过
        communityId:wx.getStorageSync('curComId').id,
        userId: wx.getStorageSync('userInfo').userId // ✅ 必加
      }
    })
      .then(res => {
        console.log('list111',res )
        let list = res.data || [];

        const now = new Date();

        // ✅ 计算状态
        list = list.map(item => {
            const start = new Date(item.start_time);
            const end = new Date(item.end_time);
          
            let status = '';
            if (now < start) status = 'upcoming';
            else if (now >= start && now <= end) status = 'ongoing';
            else status = 'ended';
          
            return {
              ...item,
              status,
          
              // ✅ 新增：是否可报名
              canJoin: status === 'upcoming' && item.isJoined == 0,
          
              // ✅ 是否可取消（你可以顺手一起做）
              canCancel: status === 'upcoming' && item.isJoined == 1,
          
              startTime: this.formatTime(start),
              endTime: this.formatTime(end)
            };
          });
        
        // ✅ tab 过滤
        const result =
          currentTab === 'all'
            ? list
            : list.filter(item => item.status === currentTab);

        this.setData({
          activities: result
        });
        console.log('activities',this.activities)
      })
      .catch(err => {
        console.error('获取活动失败', err);
        wx.showToast({
          title: '加载失败',
          icon: 'error'
        });
      });
  },

  // ✅ 时间格式化
  formatTime(date) {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = date.getMinutes();

    return `${this.pad(m)}-${this.pad(d)} ${this.pad(h)}:${this.pad(min)}`;
  },

  pad(n) {
    return n < 10 ? '0' + n : n;
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?id=${id}`
    });
  },



});