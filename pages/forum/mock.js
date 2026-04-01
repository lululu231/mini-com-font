export const mockPosts = [
    {
      topicId: "t001",
      title: "Vue3 项目性能优化的一些实践",
      communityId: "c001",
      content: "最近在做一个后台系统，遇到了一些性能瓶颈：组件重复渲染、大列表卡顿。解决方案：使用 keep-alive 缓存组件、虚拟列表优化渲染。",
      images: [
        "https://picsum.photos/300/200?1",
        "https://picsum.photos/300/200?2"
      ],
      likeCount: 128,
      commentCount: 36,
      viewCount: 1024,
      status: "normal",
      userId: "u001",
      userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
      createdAt: "2020-1-1"
    },
    {
      topicId: "t002",
      title: "小程序 scroll-view 卡顿怎么解决？",
      communityId: "c002",
      content: "我在用 scroll-view 渲染长列表的时候出现明显卡顿，目前数据量大概在 200 条左右，有没有人遇到过类似问题？",
      images: [],
      likeCount: 56,
      commentCount: 18,
      viewCount: 540,
      status: "normal",
      userId: "u002",
      userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
      createdAt: "2020-1-1"
    },
    {
      topicId: "t003",
      title: "低代码平台组件设计思路分享",
      communityId: "c002",
      content: "低代码平台最重要的是组件抽象能力、配置驱动和状态管理，推荐使用 JSON Schema 来描述组件。",
      images: [
        "https://picsum.photos/300/200?3"
      ],
      likeCount: 210,
      commentCount: 72,
      viewCount: 1890,
      status: "normal",
      userId: "u003",
      userAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
      createdAt: "2020-1-1"
    },
    {
      topicId: "t004",
      title: "为什么我的 flex 布局不生效？",
      communityId: "c003",
      content: "写了 flex 布局但是子元素没有按照预期排列，最后发现是父元素宽度没撑开。",
      images: [],
      likeCount: 34,
      commentCount: 9,
      viewCount: 300,
      status: "normal",
      userId: "u004",
      userAvatar: "https://randomuser.me/api/portraits/women/4.jpg",
      createdAt: "2020-1-1"
    },
    {
      topicId: "t005",
      title: "这个帖子已被删除",
      communityId: "c002",
      content: "违规内容已被移除",
      images: [],
      likeCount: 0,
      commentCount: 0,
      viewCount: 120,
      status: "deleted",
      userId: "u005",
      userAvatar: "https://randomuser.me/api/portraits/men/5.jpg",
      createdAt: "2020-1-1"
    },
    {
      topicId: "t006",
      title: "如何设计一个通用的评论系统？",
      communityId: "动漫社11122",
      content: "设计要点：支持多级评论、支持点赞、支持回复。推荐数据结构：id、parentId、content。",
      images: [
        "https://picsum.photos/300/200?4",
        "https://picsum.photos/300/200?5",
        "https://picsum.photos/300/200?6"
      ],
      likeCount: 89,
      commentCount: 44,
      viewCount: 760,
      status: "normal",
      userId: "u006namenamenamenaemname12227dyhchhcdgsugsduucdcuh",
      userAvatar: "https://randomuser.me/api/portraits/women/6.jpg",
      createdAt: "2020-1-1"
    }
  ];
export const mockTabList=[
    { name: '全部' ,
      communityId: "c001",
    },
    { name: '技术' ,
    communityId: "c002",
    },
    { name: '游戏' ,
    communityId: "c003",
    },
]