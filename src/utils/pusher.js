import Pusher from 'pusher-js'
import store from '../store/index'
export default function initializePusher () {
  const pusher = new Pusher('f47f2ad6b875f07ee437', {
    cluster: 'eu'
  })
  pusher.subscribe('settings')
  pusher.bind('settings-updated', (data) => {
    store.state.isActive = true
    setTimeout(function () { store.state.isActive = false }, 2000)
    store.commit('setSettings', data.ratingSettings)
    store.commit('setEmoticons', data.emojiList)
  })
}
