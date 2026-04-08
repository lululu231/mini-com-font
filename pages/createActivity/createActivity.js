import request from '../../utils/request.js';
import { dateTimePicker, formatPickerDateTime } from "./dateTimePicker.js";

Page({
  data: {
    form: {
      name: '',
      location: '',
      startTime: '',
      endTime: '',
      maxParticipants: '',
      description: ''
    },
    communityId: null,
    adminId: null,
    // 开始时间选择器
    startDateTime: [],
    startDateTimeArray: [],
    // 结束时间选择器
    endDateTime: [],
    endDateTimeArray: [],
  },

  onLoad(options) {
    const communityId = wx.getStorageSync('curComId')?.id;
    const adminId = wx.getStorageSync('userInfo').userId;
    this.setData({ communityId, adminId });
  
    // 初始化时间选择器（和你原来的逻辑一样）
    const start = '';
    const obj = dateTimePicker(2024, 2030, start);
    this.setData({
      startDateTime: obj.dateTime,
      startDateTimeArray: obj.dateTimeArray,
      endDateTime: obj.dateTime,
      endDateTimeArray: obj.dateTimeArray
    });
  
    const startTime = formatPickerDateTime(obj.dateTimeArray, obj.dateTime);
    const endTime = formatPickerDateTime(obj.dateTimeArray, obj.dateTime);
    this.setData({
      'form.startTime': startTime,
      'form.endTime': endTime
    });
  
    // 如果传了 eventId，说明是编辑
    if (options.eventId) {
        console.log('options',options)
        this.setData({ eventId: options.eventId });
      this.loadEventDetail(options.eventId);
    }
  },
  async loadEventDetail(eventId) {
    try {
      const res = await request({
        url: '/event/event',
        method: 'POST',
        data: { id: eventId } // 后端判断如果有 id 就返回该活动信息
      });
  
      const event = res?.data;
      if (event) {
        this.setData({
          'form.name': event.title,
          'form.location': event.location,
          'form.startTime': event.start_time,
          'form.endTime': event.end_time,
          'form.maxParticipants': event.max_count || '',
          'form.description': event.description || '',
          adminId: event.admin_id || this.data.adminId
        });
  
        // 初始化选择器对应值
        const startArray = dateTimePicker(2024, 2030, event.start_time);
        const endArray = dateTimePicker(2024, 2030, event.end_time);
        this.setData({
          startDateTime: startArray.dateTime,
          startDateTimeArray: startArray.dateTimeArray,
          endDateTime: endArray.dateTime,
          endDateTimeArray: endArray.dateTimeArray
        });
      }
    } catch (err) {
      console.error('加载活动详情失败load', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  // 开始时间选择
  changeStartDateTime(e) {
    this.setData({ startDateTime: e.detail.value });
    const startTime = formatPickerDateTime(this.data.startDateTimeArray, e.detail.value);
    this.setData({ 'form.startTime': startTime });
  },

  // 结束时间选择
  changeEndDateTime(e) {
    this.setData({ endDateTime: e.detail.value });
    const endTime = formatPickerDateTime(this.data.endDateTimeArray, e.detail.value);
    this.setData({ 'form.endTime': endTime });
  },

  submit() {
    const { form, communityId, adminId, eventId } = this.data;
  
    if (!form.name) return wx.showToast({ title: '请输入活动名称', icon: 'none' });
    if (!form.startTime || !form.endTime) return wx.showToast({ title: '请选择时间', icon: 'none' });
    if (new Date(form.startTime.replace(/-/g, '/')) >= new Date(form.endTime.replace(/-/g, '/'))) {
      return wx.showToast({ title: '结束时间必须晚于开始时间', icon: 'none' });
    }
    if (!communityId) return wx.showToast({ title: '社团信息缺失', icon: 'none' });
  
    request({
      url: '/event/event',
      method: 'POST',
      data: {
        id: eventId || undefined, // 有 id 则更新，无则新增
        community_id: communityId,
        title: form.name,
        description: form.description,
        start_time: form.startTime,
        end_time: form.endTime,
        location: form.location,
        admin_id: adminId || undefined,
        max_count: form.maxParticipants ? Number(form.maxParticipants) : null
      }
    })
    .then(() => {
      wx.showToast({ title: eventId ? '修改成功' : '发布成功', icon: 'success' });
      wx.navigateBack();
    })
    .catch(err => {
      console.error('活动操作失败', err);
      wx.showToast({ title: err?.message || '操作失败', icon: 'none' });
    });
  }
});