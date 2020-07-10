//#region Registrasi service worker
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const requestPermission = () => {
  if ('Notification' in window) {
    Notification.requestPermission().then((result) => {
      if (result === 'denied') {
        console.log('Fitur notifikasi tidak diijinkan')
        return
      } else if (result === 'default') {
        console.error('Pengguna menutup kotak dialog permintaan ijin')
        return
      }

      if ('PushManager' in window) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                'BGZgynUQyzxMM13iHYDlelTrbd-U5lPolBeHwfh3zNxiH4pTqh7T5CRmZatMT8Ug4-RLG3Ejy_wFhP_Kdk_vTFo'
              ),
            })
            .then((subscribe) => {
              console.log(
                'Berhasil melakukan subscribe dengan endpoint: ',
                subscribe.endpoint
              )
              console.log(
                'Berhasil melakukan subscribe dengan p256dh key: ',
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey('p256dh'))
                  )
                )
              )
              console.log(
                'Berhasil melakukan subscribe dengan auth key: ',
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey('auth'))
                  )
                )
              )
            })
            .catch((err) => {
              console.error(
                'Tidak dapat melakukan subscribe ',
                err.message
              )
            })
        })
      }
    })
  } else {
    alert('Browser tidak mendukung notifikasi')
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('Pendaftaran ServiceWorker berhasil')
      })
      .catch(() => {
        console.log('Pendaftaran ServiceWorker gagal')
      })
  })
  if(window.location.pathname === '/football-update/') {
    setTimeout(() => {
      requestPermission()
    }, 3000)
  }
} else {
  console.log('ServiceWorker belum didukung browser ini.')
}
//#endregion
