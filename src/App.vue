<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { HTTP } from '../api/axios'
export default {
  name: 'app',
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  created () {
    HTTP.get('rating/settings')
      .then(response => this.$store.commit('setSettings', response.data))
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
    HTTP.get('emoji')
      .then(response => this.$store.commit('setEmoticons', response.data))
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
    // event triggered in emoticon component that has payload with id of the emoticon user has selected and that should trigger POST request
    this.$root.$on('post', (id) => {
      HTTP.post('rating', {
        emojiId: id
      })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
    })
  }
}
</script>
<style lang="scss">
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
}
</style>
