import request from '../../utils/request.js';

Page({
  data: {
    year: 0,
    month: 0,
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    calendar: [],
    eventMap: {}, // 日期 -> 活动数组
    showDetail: false,
    selectedDate: '',
    selectedEvents: [],
    statusMap: {
        upcoming: '未开始',
        ongoing: '进行中',
        ended: '已结束'
      }
  },

  onLoad() {
    const now = new Date();
    this.setData({
      year: now.getFullYear(),
      month: now.getMonth() + 1
    });

    this.fetchMyEvents();
  },
  
  // 获取我报名的活动
  fetchMyEvents() {
    const userId = wx.getStorageSync('userInfo').userId;
  
    console.log('📌 日历请求 userId:', userId);
  
    request({
      url: '/event/myCalendar',
      method: 'GET',
      data: { userId }
    }).then(res => {
  
      // 🔥 1. 打印完整返回
      console.log('📌 原始接口返回:', res);
  
      // 🔥 2. 打印 data 层
      console.log('📌 res.data:', res.data);
  
      // 🔥 3. 修正数据结构（关键）
      const list = res.data || [];
  
      console.log('📌 活动列表 list:', list);
  
      const map = this.buildEventMap(list);
  
      console.log('📌 转换后的 eventMap:', map);
  
      this.setData({ eventMap: map });
  
      this.generateCalendar();
    }).catch(err => {
      console.error('❌ 日历接口失败:', err);
    });
  },

  // 构建日期映射
  buildEventMap(list) {
    const map = {};
    const now = new Date();

    list.forEach(item => {
      const start = new Date(item.start_time);
      const end = new Date(item.end_time);

      let status = '';
      if (now < start) status = 'upcoming';
      else if (now >= start && now <= end) status = 'ongoing';
      else status = 'ended';

      const key = this.formatDateKey(start);

      if (!map[key]) {
        map[key] = [];
      }

      map[key].push({
        title: item.title,
        status,
        startTime: this.formatTime(item.start_time),
        endTime: this.formatTime(item.end_time)
      });
    });

    return map;
  },
  formatTime(timeStr) {
    if (!timeStr) return '';
    return timeStr.replace('T', ' ').slice(0, 16);
  },
  // 生成日历
  generateCalendar() {
    const { year, month, eventMap } = this.data;
  
    const firstDay = new Date(year, month - 1, 1).getDay();
    const days = new Date(year, month, 0).getDate();
  
    const calendar = [];
  
    // 补空格
    for (let i = 0; i < firstDay; i++) {
      calendar.push({ day: '', events: [] });
    }
  
    for (let i = 1; i <= days; i++) {
      const dateObj = new Date(year, month - 1, i);
      const dateStr = this.formatDateKey(dateObj);
  
      calendar.push({
        day: i,
        fullDate: dateStr,
        events: (eventMap[dateStr] || []).slice(0, 2),
        moreCount: Math.max((eventMap[dateStr] || []).length - 2, 0)
      });
    }
  
    this.setData({ calendar });
  },
  onDayClick(e) {
    const date = e.currentTarget.dataset.date;
  
    if (!date) return;
  
    const events = this.data.eventMap[date] || [];
  
    this.setData({
      showDetail: true,
      selectedDate: date,
      selectedEvents: events
    });
  },
  closeDetail() {
    this.setData({ showDetail: false });
  },
  prevMonth() {
    let { year, month } = this.data;
  
    month--;
    if (month === 0) {
      month = 12;
      year--;
    }
  
    this.setData({ year, month }, () => {
      this.generateCalendar();
    });
  },
  
  nextMonth() {
    let { year, month } = this.data;
  
    month++;
    if (month === 13) {
      month = 1;
      year++;
    }
  
    this.setData({ year, month }, () => {
      this.generateCalendar();
    });
  },
  stop() {} ,// 阻止冒泡
  // yyyy-MM-dd
  formatDateKey(date) {
    const y = date.getFullYear();
    const m = this.pad(date.getMonth() + 1);
    const d = this.pad(date.getDate());
    return `${y}-${m}-${d}`;
  },

  pad(n) {
    return n < 10 ? '0' + n : n;
  }
});