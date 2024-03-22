function noti(title, subtitle = '', content = '') {
  $httpClient.get('https://api.day.app/gLasupAGncmUaB58eu2Qzi/' + encodeURI(title) + '/' + encodeURI(content) + '?url=' + encodeURI('welink://business'))
}

function isHoliday() {
  var now = new Date()
  var day = now.getDay()
  if (day == 0) return true
  if (day != 6) return false

  var next = new Date(now.getTime() + 7*24*3600*1000)
  var lastSaturday = (next.getMonth() != now.getMonth()) 
  return !lastSaturday;
}


function isPunchToday() {
  let start = $persistentStore.read('start')
  if (!start) return false;
  let d = new Date(Date.parse(start.substr(0,10) + 'T' + start.substr(11,19)))
  let now = new Date();
  return d.getMonth() == now.getMonth() && d.getDate() == now.getDate();
}

function checkClockIn() {
  if(isHoliday()) {
    return
  }


  if (!isPunchToday()) {
    noti('上班打卡了喂', '', '未检查到打卡时间');
  }
}

checkClockIn()
$done({msg: $persistentStore.read('start')})

