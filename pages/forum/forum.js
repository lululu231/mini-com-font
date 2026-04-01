// pages/forum/forum.js
import { mockPosts ,mockTabList} from './mock.js'
Page({
  data: {
        curTab:0,
        curcommunityId:"c001",
        //mock-tab社团数据
        tabList: [],
        //mock-帖子数据
        postList:[],
  },
  curcommunityIdCheck(curTab){
        console.log('this.data.tabList',this.data.tabList)
        const tab=this.data.tabList[curTab]
        console.log('tab',tab)
        return tab?tab.communityId:''
  },
  //点击tab切换
  handleTabChange(e) {
    const { index } = e.detail;
    console.log('e.detail',e.detail)
    const curId=this.curcommunityIdCheck(index)
    console.log('curId',curId)
    this.setData({
      curTab: index,
      curcommunityId:curId
    });
    console.log('this.data.curcommunityIdcurcommunityId',this.data.curcommunityId)
    // 👉 这里顺便发请求（推荐）
    //this.getListByTab(index);
  },
  //创建新帖子
  newpostTap(){
    console.log('创建新帖子')
    wx.navigateTo({
      url: '/pages/newPostPage/newPostPage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //  请求tabList数据
        this.setData({
            tabList:mockTabList,
            postList:mockPosts
        })
        console.log(mockPosts,this.data.postList)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})