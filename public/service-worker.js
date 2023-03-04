/**
 * 卸载 service worker （若有）
 * 只有在 spa 模式下，这个文件才会被包含进 dist。
 * pwa 会覆写这个文件
 */
try {
  self.skipWaiting()
} catch (e) {
  console.error(e)
}

try {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister().then()
    } })
  console.log('Service Worker unregistered by navigator')
} catch (e) {
  console.error(e)
}

try {
  self.registration.unregister().then()
  console.log('Service Worker unregistered by self')
} catch (e) {
  console.error(e)
}
