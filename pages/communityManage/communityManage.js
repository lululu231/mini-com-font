// pages/communityManage/communityManage.js
Page({
    data: {
     
    },
  
    // 跳转函数
    goCreateDepartment() {
      wx.navigateTo({
        url: '/pages/createDepartment/createDepartment'
      });
    },
  
    goCreateActivity() {
      wx.navigateTo({
        url: '/pages/createActivity/createActivity'
      });
    },
  
    goCreateNotice() {
      wx.navigateTo({
        url: '/pages/publishNotice/publishNotice'
      });
    },
  
    goMemberManage() {
      wx.navigateTo({
        url: '/pages/memberManage/memberManage'
      });
    },
  
    goDepartmentManage() {
      wx.navigateTo({
        url: '/pages/departmentManage/departmentManage'
      });
    },
  
    goActivityManage() {
      wx.navigateTo({
        url: '/pages/activityManage/activityManage'
      });
    },
    goAlbumManage() {
        wx.navigateTo({
          url: '/pages/albumManage/albumManage'
        });
      },
      goApplyManage(){
        wx.navigateTo({
            url: '/pages/applyList/applyList'
          });
      }
  });