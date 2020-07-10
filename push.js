const webPush = require('web-push')

const vapidKeys = {
  'publicKey': 'BGZgynUQyzxMM13iHYDlelTrbd-U5lPolBeHwfh3zNxiH4pTqh7T5CRmZatMT8Ug4-RLG3Ejy_wFhP_Kdk_vTFo',
  'privateKey': 'j07WwqxEiYYvvDoMgbxar9eNt-DjH8UiXqT2TunRH44'
}

webPush.setVapidDetails(
  'mailto:arrisnawadi@fastmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubscription = {
  'endpoint': 'https://fcm.googleapis.com/fcm/send/dclJs8ZzljU:APA91bH5tJnsHbRCyjEG5DftJ2vLblR-R8WazHB8yHDiG4DQyzoHT1j1lEv4z2DQdhTS_opKvjdRqYwNKW8kRpMIeLK55MjpwO6fIrgohEDpKnSZ4BwxYEDMGuygJJMUc9le55G0NcJx',
  'keys': {
    'p256dh': 'BAfC/0mDvUk4pKHVT/WelV9pYQ/F+FN22uCxPCHf9ud5xf821WfNjnO3yTRp/0/nTufgdKcYOTW+ZhpAUyiQRuQ=',
    'auth': 'pn9MqIeeKHFElydsfon7/Q=='
  }
}

let payload = 'Congratulations!'

const options = {
  gcmAPIKey: '547015155146',
  TTL: 60
}

webPush.sendNotification(
  pushSubscription,
  payload,
  options
)