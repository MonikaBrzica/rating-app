<template>
  <div class="right-nav-container">
    <div class="drop">
      <img :src= this.$store.state.user.imgSrc
           alt="Profile">
      <div class="dropdown-content">
        <p>{{this.$store.state.user.fullname}}</p>
        <button @click="logOut()">Logout</button>
      </div>
    </div>
    <hr>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'RightNav',
  methods: {
    async logOut () {
      try {
        await this.$gAuth.signOut()
        this.revokeToken(this.$store.state.user.token)
        this.$store.commit('logoutUser')
        this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    },
    revokeToken (token) {
      axios.post('https://oauth2.googleapis.com/revoke?token=' + token, {}, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.right-nav-container {
  background-color: $bg;
  width: 64px;
  text-align: center;
  order: 3;

  .drop {
    font-size: 1rem;
    cursor: pointer;
    width: 64px;
    height: 64px;

    &:hover {
      .dropdown-content {
        display: block;
      }
    }

    img {
      border-radius: 100%;
      width: 40px;
      height: 40px;
      margin-top: 12px;
    }

    .dropdown-content {
      position: absolute;
      right: 30px;
      min-width: 160px;
      background-color: $bg-light;
      z-index: 1;
      display: none;
      text-align: center;
      padding: 1.5rem 0.5rem;
      border-radius: 15px;
      border-top-right-radius: 0;

      p, button {
        font-family: 'Roboto-Medium', sans-serif;
        font-size: 1rem;
        color: $white-850;

        &:hover {
          color: $white-500;
        }
      }

      p {
        margin: 0 0 1rem 0;
      }

      button {
        background-color: transparent;
        outline: none;
        border: none;
        width: 100%;
      }
    }
  }
  hr {
    background-color: $white-500;
    height: 1px;
    border: none;
  }
}
/* Media query */
@media only screen and (max-width: 768px) {
  .right-nav-container {
    width: 64px;
    height: 60px;
    .drop {
      img {
        margin-top: 10px;
      }
    }
    hr {
      visibility: hidden;
    }
  }
}
</style>
