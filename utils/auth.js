export const getToken = () => wx.getStorageSync('token');

export const setToken = (token) => wx.setStorageSync('token', token);