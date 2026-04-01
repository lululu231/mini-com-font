Component({
    properties: {
      item: Object,
  
      // ✅ 尺寸规范
      size: {
        type: String,
        value: 'medium' // small / medium / large
      },
  
      // ✅ 状态
      clickable: {
        type: Boolean,
        value: true
      },
  
      // ✅ 扩展能力
      customClass: String,
      customStyle: String
    }
  })