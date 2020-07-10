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
  'endpoint': 'https://fcm.googleapis.com/fcm/send/dFfsM7RqutA:APA91bEoSMlUoIimY6ho9bZ1kDvJUZr0qWIhuabRPvF00IyhqK1ccAm2Z_HiF76zpSHWLo-Qihk_EAOTtIT48oDDNHDgX7F5iU1bi6Ke0ub4VIrv-vLNHUvyYrSu5oRHj2921-K_yuOO',
  'keys': {
    'p256dh': 'BLnLBr5S81Izw4Ori+1lJOhw9t/jH7GA/M7YakK//Zd+WTMmSDUQ2Q5XWeFmxC8ktuNN/ewKcQs7g18PnsuvF7g=',
    'auth': 'x8wvuqRO7vfLHlimRq/33g=='
  }
}

let payload = 'Congratulations!'

const options = {
  gcmAPIKey: '1077103199328',
  TTL: 60
}

webPush.sendNotification(
  pushSubscription,
  payload,
  options
)