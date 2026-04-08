// components/section2/section2.js
import { DEFAULT_AVATAR } from '../../constants/index.js'
import dayjs from '../../miniprogram_npm/dayjs/index.js'

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    actName: {
        type: String,
        value: '默认活动'
      },
    
    imgSrc:{
        type: String,
        value:DEFAULT_AVATAR
    },
    actStatus:{
        type: String,
        value:'1233rtxdgdhscsgcuagsd'
    },
    start_time: {
        type: String,
        value: ''
    },
    location:{
        type: String,
        value:'1233rtxdgdhscsgcuagsd'
    },
    formattedTime:{
        type: String,
        value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
//   observers:{
//     actName(newVal){
//         console.log('112233')
//     }
//   },
  observers: {
    start_time(newVal) {
        console.log('新数据')
      if (newVal) {
        const localTime = dayjs(newVal).format('YYYY-MM-DD HH:mm')
        this.setData({
          formattedTime: localTime
        })
      }
    }
 },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})