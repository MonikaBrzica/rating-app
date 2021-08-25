import Pusher from 'pusher-js'
import store from '../store/index'
export default function initializePusher () {
  // init pusher instance
  const pusher = new Pusher('f47f2ad6b875f07ee437', {
    cluster: 'eu'
  })
  // subscribing to settings channel
  pusher.subscribe('settings')
  // listening for settings-updated event
  pusher.bind('settings-updated', (data) => {
    // dispaying settings updated popup
    store.state.isActive = true
    setTimeout(function () { store.state.isActive = false }, 2000)
    // storing new settings and emoji
    store.commit('setSettings', data.ratingSettings)
    store.commit('setEmoticons', data.emojiList)
  })
}
