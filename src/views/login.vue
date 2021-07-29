<template>
    <div class="main">
        <div class="login-container">
        <p>You have to log in to google to access this app</p>
        <button @click="login">Log In</button>
        </div>
    </div>
</template>

<script>
import { HTTP } from '../../api/axios'
export default {
  name: 'login',
  props: {
  },
  data: function () {
    return {
    }
  },
  methods: {
    async login () {
      try {
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }
        // this.sendToBackend(googleUser.getAuthResponse())
        this.storeData(googleUser, googleUser.getAuthResponse())
      } catch (error) {
        // on fail do something
        console.error(error)
        return null
      }
    },
    storeData (data, auth) {
      const user = {
        fullname: data.Ss.Me,
        email: data.Ss.Dt,
        imgSrc: data.Ss.hJ,
        loggedIn: true,
        token: auth.access_token
      }
      console.log(user)
      this.$store.commit('loginUser', user)
      this.$router.push('/today')
    },
    sendToBackend (data) {
      HTTP.get('auth', {
        accessToken: data.access_token
      })
      console.log('accessToken:', data.access_token)
    }
  }
}
</script>

<style lang=scss scoped>
.main {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: $bg;
    .login-container{
    p {
        max-width: 23ch;
        margin: auto;
        text-align: center;
        margin-top:8rem;
        font-size: 2.5rem;
        color: $white-850;
        font-family: "Roboto-Bold", sans-serif;
    }
    button {
        display: block;
        margin: auto;
        margin-top: 3rem;
        padding: 1rem  2rem;
        font-size: 1.5rem;
    }
    }

}

</style>
