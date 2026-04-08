import { DEFAULT_AVATAR } from '../../constants/index.js'
import { getAvatar } from '../../api/user.js';
import request from '../../utils/request.js';


Page({
    data:{
        welcome:'欢迎回来',
        userNickname:'小明',
        hotCommunit:'热门社团',
        newAct:'最新活动',
        userInfor:{},
        avatarUrl:DEFAULT_AVATAR,
        communities:[],
        activities:[]
    },
    onLoad: async function() {
        const userInfo = wx.getStorageSync('userInfo');
        //console.log('进入首页', userInfo);
    
        const { userId } = userInfo || {};
    
        if (!userId) {
            wx.showToast({
                title: '请先登录',
                icon: 'none'
            });
            return;
        }
    
        try {
            const res = await getAvatar(userId);
            const data=res.data
            //console.log('头像数据',data)

            this.setData({
                avatarUrl: data.avatar_url,
                userNickname: data.nick_name,
            });
    
        } catch (err) {
            //console.error('获取头像失败', err);
            wx.showToast({
                title: '加载失败',
                icon: 'none'
            });
        }
        this.fetchAllCommunities();
        this.fetchActivities()
      },
      fetchActivities() {
        request({
          url: '/event/all', // ✅ 相对路径
          method: 'GET',
          data: {
            status: 'approved' ,// 只查审核通过
            //communityId:wx.getStorageSync('curComId').id
          }
        })
          .then(res => {
            
            let list = res.data || [];
            console.log('全部活动',list )
            this.setData({
              activities: list
            });
            console.log('activities111',this.data.activities)
          })
          .catch(err => {
            console.error('获取活动失败', err);
            wx.showToast({
              title: '加载失败',
              icon: 'error'
            });
          });
      },
      fetchAllCommunities() {
        const userInfo = wx.getStorageSync('userInfo');
        const userId = userInfo?.userId;
    
        request({
            url: '/community/all',
            method: 'GET'
          })
          .then(res => {
            if (res.code === 0) {
              const communities = res.data.slice(0, 5);
              console.log('communities',communities)
              this.setData({
                communities:communities
              })
            }
          })
          .catch(err => console.error(err));
      },
    handleAllClub(){
        console.log('点击跳转全部社团')
        wx.navigateTo({
            url:'../allCommunity/allCommunity'
        })
    },
    goActivityAll(){
        console.log('点击了查看活动')
        wx.navigateTo({
            url:'/pages/acAll/acAll'
        })
    }


})