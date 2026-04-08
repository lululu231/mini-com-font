//设置日期的两位数显示
function withData(param) {
    return param < 10 ? '0' + param : '' + param;
  }
function getLoopArray(start, end) {
    var start = start || 0;
    var end = end || 1;
    var array = [];
    for (var i = start; i <= end; i++) {
      array.push(withData(i));
    }
    return array;
  }
function getMonthDay(year, month) {
    var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;
    switch (month) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        array = getLoopArray(1, 31)
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        array = getLoopArray(1, 30)
        break;
      case '02':
        array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
        break;
      default:
        array = '月份格式不正确，请重新输入！'
    }
    return array;
  }
function getNewDateArry() {
    // 当前时间的处理
    var newDate = new Date();
    var year = withData(newDate.getFullYear()),
      mont = withData(newDate.getMonth() + 1),
      date = withData(newDate.getDate()),
      hour = withData(newDate.getHours()),
      minu = withData(newDate.getMinutes()),
      seco = withData(newDate.getSeconds());
    return [year, mont, date, hour, minu, seco];
  }
  /**
   *  startYear： 开始的年份，进行年份的范围指定
   *  endYear：   结束的年份，进行年份的范围指定
   *  date：      年份日期
   *  1、如果不传参数，默认显示当前日期和时间
   *  2、如果只需要date参数，将startYear和endYear设置为空字符串
   */
  export function dateTimePicker(startYear, endYear, date) {
    // 返回默认显示的数组和联动数组的声明
    var dateTime = [], dateTimeArray = [[], [], [], [], [], []];
    var start = startYear || 1978;
    var end = endYear || 2100;
    // 默认开始显示数据 
    var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
    // 处理联动列表数据
    /*年月日 时分秒*/
    dateTimeArray[0] = getLoopArray(start, end);
    dateTimeArray[1] = getLoopArray(1, 12);
    dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
    dateTimeArray[3] = getLoopArray(0, 23);
    dateTimeArray[4] = getLoopArray(0, 59);
    dateTimeArray[5] = getLoopArray(0, 59);
    dateTimeArray.forEach((current, index) => {
      dateTime.push(current.indexOf(defaultDate[index]));
    });
    return {
      dateTimeArray: dateTimeArray,
      dateTime: dateTime
    }
  }
  /** 对数组中的时间信息进行格式化
   *  dateTimeArray :通过dateTimePicker获取的日期范围数组
   *  dateTime：     选择的日期数组信息
   */
   export function formatPickerDateTime(dateTimeArray,dateTime) {
    var obj = dateTimePicker()
    var format = dateTimeArray[0][dateTime[0]] + '-' + dateTimeArray[1][dateTime[1]]
      + '-' + dateTimeArray[2][dateTime[2]] + " " +
      dateTimeArray[3][dateTime[3]] + ':' + dateTimeArray[4][dateTime[4]] + ':' + dateTimeArray[5][dateTime[5]]
    return format
  }

  