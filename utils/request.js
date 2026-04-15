const BASE_URL = "https://lulu76.top"
const request = (options) => {
    return new Promise((resolve, reject) => {
        console.log('请求URL:', BASE_URL + options.url);
        wx.request({
            // ✅ 防止双斜杠
            url: BASE_URL + options.url,

            method: options.method || 'GET',
            data: options.data || {},

            header: {
                'Content-Type': 'application/json',
                ...options.header
            },

            success: (res) => {
                // ✅ 先判断 HTTP 状态码
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    wx.showToast({
                      title: '服务器异常',
                      icon: 'none'
                    });
                    return reject(res);
                  }          
                
                const resData = res.data || {};
                console.log('统一封装request',resData)
                const { code, msg, data } = resData;

                // ✅ 兼容后端没返回 code 的情况
                if (code !== 0) {
                    wx.showToast({
                        title: msg || '请求失败',
                        icon: 'none'
                    });
                    return reject(resData);
                }

                // ✅ 返回真正业务数据
                resolve({
                    data,
                    msg,
                    code
                  })
            },

            fail: (err) => {
                wx.showToast({
                    title: '网络错误',
                    icon: 'none'
                });
                reject(err);
            }
        });
    });
};

export default request;