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
      loggedIn: false
    }
  },
  methods: {
    async login () {
      // method logs user into google using oAuth2
      // if block checks if the user is connected
      if (!this.$store.state.user.loggedIn) {
        try {
          // opening pop up google sign in
          const googleUser = await this.$gAuth.signIn()
          // after successful login sending user data to backend
          this.sendToBackend(googleUser)
          // if the login is unsuccessful returning
          if (!googleUser) {
            return null
          }
        } catch (error) {
          // on fail do something
          console.error(error)
        }
      }
    },
    storeData (data, role) {
      // method that sets user info in store.
      // it's called inside sendToBackend method
      // constructing user object
      const user = {
        fullname: data.Ss.Me,
        email: data.Ss.Dt,
        imgSrc: data.Ss.hJ,
        loggedIn: true,
        token: data.Zb.access_token,
        role: role
      }
      // storing it in store.
      this.$store.commit('loginUser', user)
      // redirecting user to /today
      this.$router.push('/today')
    },
    sendToBackend (data) {
      // method that sends access token to backend for authentication
      HTTP.post('auth', {
        accessToken: data.Zb.access_token
      }).then(response => {
        // if everything is alright storing user in vuex store.
        this.storeData(data, response.data.role)
      })
    }
  },
  created () {
    HTTP.get('/rating/current-settings')
      .then(response => this.$store.commit('setSettings', response.data.ratingSettings))
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
    HTTP.get('/emoji')
      .then(response => this.$store.commit('setEmoticons', response.data.emojiList))
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
      HTTP.post('/rating', {
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
    const that = this
    const checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit
      that.isSignIn = that.$gAuth.isAuthorized
      if (that.isInit) {
        clearInterval(checkGauthLoad)
        that.login()
      }
    }, 100)
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
  background-color: #1B1E24;
}
</style>
