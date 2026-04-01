Component({
    properties: {
      // 可加属性，比如初始值
      value: { type: String, value: '' }
    },
    data: {},
    methods: {
      onInput(e) {
        // 把输入的内容抛给父组件
        this.triggerEvent('search', e.detail.value);
        console.log('value: { type: String, value:',e.detail.value)
      }
    }
  })