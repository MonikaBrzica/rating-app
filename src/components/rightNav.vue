<template>
  <div class="right-nav-container">
    <div class="drop">
      <img :src= this.$store.state.user.imgSrc
           alt="Profile">
      <div class="dropdown-content">
        <p>{{this.$store.state.user.fullname}}</p>
        <button class="btn" @click="logOut()">Logout</button>
      </div>
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  name: 'RightNav',
  methods: {
    logOut () {
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>
<style lang="scss" scoped>
.right-nav-container {
  z-index: 4;
  background-color: $bg;
  width: 64px;
  text-align: center;
  order: 3;
  position: fixed;
  right: 0;
  height: 100%;
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
      top: 32px;
      position: absolute;
      right: 64px;
      min-width: 160px;
      background-color: $bg;
      box-shadow: 0px 0px 4px 1px #1B1E24;
      z-index: 1;
      display: none;
      text-align: center;
      border-radius: 5px;
      border-top-right-radius: 0;
      p {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 1rem 0rem 0.5rem 0rem;
      }
      button {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 0.5rem 0rem 1rem 0rem;
      }
      p, button {
        font-family: 'Roboto-Medium', sans-serif;
        font-size: 1rem;
        color: $white-850;
        opacity: 0.5;
        &:hover {
          background-color: $bg-light;
          color: $white-850;
          opacity: 1;
        }
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
    position: absolute;
    right: 0;
    order:2;
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
