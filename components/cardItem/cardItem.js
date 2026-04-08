Component({
    properties: {
      item: Object,
  
      size: {
        type: String,
        value: 'medium'
      },
  
      clickable: {
        type: Boolean,
        value: true
      },
  
      customClass: String,
      customStyle: String
    },
  
    methods: {
      handleClick() {
        if (!this.properties.clickable) return;
  
        const { item } = this.properties;
  
        // ✅ 核心：从 item 中拿跳转信息
        if (item.url) {
          wx.navigateTo({
            url: item.url
          });
        } else {
          console.warn('未配置跳转路径');
        }
      }
    }
  });