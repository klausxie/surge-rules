function noti(title, subtitle = '', content = '') {
  $httpClient.get('https://api.day.app/gLasupAGncmUaB58eu2Qzi/' + encodeURI(title) + '/' + encodeURI(content) + '?url=' + encodeURI('welink://'))
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

function checkClockOut() {
  if(isHoliday()) {
    return
  }

  if (!isPunchToday()) {
    noti('今天没打卡？GG', '', '');
    return
  }
  let time = $persistentStore.read('end')
  let end = new Date(Date.parse(time.substr(0,10) + 'T' + time.substr(11,19)))
  if (end.getHours() * 60 + end.getMinutes() < 1110) {
    noti('下班打卡了喂', '', 'last: ' + time);
  } else {
    $notification.post('已打卡', '', time)
  }
}

checkClockOut()
$done({msg: $persistentStore.read('end')})

