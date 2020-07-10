const webPush = require('web-push')

const vapidKeys = {
  'publicKey': 'BOIEPhXnOLvwaxzA-aGFjjJCcXxtYIpKm_MUsrX4I0AYEZBbvXoky-nWo1Huu_-4ckfW7qs3q_vPFdLCiBkTCPo',
  'privateKey': 'Q_9nuEhYAGOF5Xtv58z_qV1g6Rt67uJ7Rs5h2BIbKvc'
}

webPush.setVapidDetails(
  'mailto:arrisnawadi@fastmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubscription = {
  'endpoint': 'https://fcm.googleapis.com/fcm/send/dVhR6X4vxYQ:APA91bEZfCg5KbCEZjmdZTkxzLEhOC1a-C1QqYKhKLg-PyHWl5QuRfln1tyBxtdVlXDti9RYRlvBODz_QcphG0lGByLm95rdKNt1wjxIlSQaKW635oXElKD7VgjYHLY_blPI7H-kxfOZ',
  'keys': {
    'p256dh': 'BIPf/qev6L4dXbjZi99kfIhOyPZMTOn9ItTEO5WYknkFEzxB0bn3/fpyKdYasb3/4mDLkoMStDoPgrHOLHRYQHw=',
    'auth': 'OBl7JHlYgnJYmmN9vjU3gw=='
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