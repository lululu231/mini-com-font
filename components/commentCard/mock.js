export const mockCommentsTree = [
    // 一级评论 1
    {
      id: 1,
      topic_id: "t001",
      user_id: "u001",
      user_name: "吃上次",
      user_avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      content: "这个项目的性能优化写得很详细 👍",
      replyid: 0, // 回复0表示一级评论
      pid: 0,     // 父评论id，一级评论为0
      status: "normal",
      children: [
        // 二级评论 1-1（同一用户）
        {
          id: 2,
          topic_id: "t001",
          user_id: "u002",
          user_name: "前端阿强",
          user_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
          content: "请问你用的是哪种缓存策略？",
          replyid: 1, // 回复 id=1 的评论
          pid: 1,     // 父评论 id
          status: "normal"
        },
        // 二级评论 1-2（不同用户）
        {
          id: 3,
          topic_id: "t001",
          user_id: "u003",
          user_name: "小李",
          user_avatar: "https://randomuser.me/api/portraits/women/3.jpg",
          content: "我也是刚刚遇到这个问题，求解答",
          replyid: 1,
          pid: 1,
          status: "normal"
        },
        // 二级评论 1-3（回复二级评论1-2）
        {
          id: 4,
          topic_id: "t001",
          user_id: "u001",
          user_name: "吃上次",
          user_avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          content: "我当时用的是 localStorage + vuex 缓存",
          replyid: 3, // 回复二级评论 id=3
          pid: 1,
          status: "normal"
        }
      ]
    },
    // 一级评论 2
    {
      id: 5,
      topic_id: "t001",
      user_id: "u004",
      user_name: "前端小王",
      user_avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      content: "列表渲染的优化也可以考虑虚拟列表",
      replyid: 0,
      pid: 0,
      status: "normal",
      children: [
        // 二级评论 2-1
        {
          id: 6,
          topic_id: "t001",
          user_id: "u002",
          user_name: "前端阿强",
          user_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
          content: "虚拟列表对大数据量确实有用",
          replyid: 5,
          pid: 5,
          status: "normal"
        },
        // 二级评论 2-2
        {
          id: 7,
          topic_id: "t001",
          user_id: "u005",
          user_name: "后端小刘",
          user_avatar: "https://randomuser.me/api/portraits/men/5.jpg",
          content: "我更关心接口返回速度的优化",
          replyid: 5,
          pid: 5,
          status: "normal"
        }
      ]
    }
  ];