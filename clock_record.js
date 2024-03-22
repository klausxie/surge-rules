function isPunchToday() {
  let start = $persistentStore.read('start')
  if (!start) return false;
  let d = new Date(Date.parse(start.substr(0,10) + 'T' + start.substr(11,19)))
  let now = new Date();
  return d.getMonth() == now.getMonth() && d.getDate() == now.getDate();
}

try {
  let body = JSON.parse($response.body);
  console.log(body)
  var status = body.status;
  if (status == 1) {
    if (!isPunchToday()) {
      $persistentStore.write(body.data.sysDate, 'start')
    }
    $persistentStore.write(body.data.sysDate, 'end')
    $notification.post('打卡成功', body.data.sysDate, '');
   
  } else {
    $notification.post('打卡失败', body.msg, '');
  }
} catch (e) {
  $notification.post('打卡异常', e.message, '');
}
$done({});

