<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import Pusher from 'pusher-js'
export default {
  name: 'app',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    subscribe () {
      const pusher = new Pusher('f47f2ad6b875f07ee437', {
        cluster: 'eu'
      })
      pusher.subscribe('settings')
      pusher.bind('settings-updated', (data) => {
        this.$store.commit('setSettings', data.value)
      })
    }
  },
  created () {
    // waititng for $gAuts to initialize.
    // initilazing socket
    this.subscribe()
    this.$store.dispatch('getCurrentSettings')
    this.$store.dispatch('getEmojiArray')
    // event triggered in emoticon component that has payload with id of the emoticon user has selected and that should trigger POST request
    this.$root.$on('post', (id) => {
      this.$store.dispatch('postRating', id)
    })
  }
}
</script>
<style lang="scss">
*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@font-face {
  font-family: 'Roboto-Bold';
  src: url('assets/fonts/Roboto-Bold.ttf') format('truetype');
}
@font-face {
  font-family: 'Roboto-Medium';
  src: url('assets/fonts/Roboto-Medium.ttf') format('truetype');
}
@font-face {
  font-family: 'Roboto-Regular';
  src: url('assets/fonts/Roboto-Regular.ttf') format('truetype');
}
#app {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: $bg-dark;
  overflow-x: hidden;
}
</style>
