Component({
    properties: {
      activities: {
        type: Array,
        value: []
      }
    },
  
    observers: {
      activities(newVal) {
        console.log('props.activities变化:', newVal)
      }
    }
  })