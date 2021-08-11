<template>
  <div class="nav-container">
    <img class="logo"
         src="../assets/images/logo.png"
         alt="logo">
    <NavLink v-bind:data="{id: item.id, src: item.src, text: item.text, link: item.link }"
             v-for="item in nav"
             v-bind:key="item.id"
             v-on:show="itemClicked()"/>
    <div class="set-container"
         v-show="showModal">
      <Settings  v-on:close="itemClicked()"/>
    </div>
  </div>
</template>
<script>
import NavLink from '../components/navLink'
import Settings from './settings'
export default {
  name: 'LeftNav',
  components: {
    NavLink,
    Settings
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    itemClicked () {
      this.showModal = !this.showModal
    }
  },
  computed: {
    nav () {
      return this.$store.getters.getNav
    }
  }
}
</script>
<style scoped lang=scss>
li:nth-child(4) {
  position: absolute;
  bottom: 0;
}
.nav-container {
  z-index: 4;
  position: relative;
  background-color: $bg;
  width: 100px;
  min-height: 100%;
  height: auto;
  order: 1;
  .logo {
    margin: 14px 23px;
    text-align: center;
  }
  .set-container {
    margin-left: 100px;
    height: 100vh;
    width: calc(100% - 100px);
    max-width: 1056px;
    position: fixed;
    bottom: 0;
    top:0;
    z-index: 1;
    box-shadow: 5px 5px 5px 5px #1B1E24;
  }
}
@media only screen and (max-width: 768px) {
  .nav-container {
    width: calc(100% - 64px);
    height: 60px;
    min-height: unset;
    position: absolute;
    display: flex;
    order:1;
    .logo {
      margin: 3px 5px;
      width: 54px;
      height: 54px;
    }
    .set-container {
      margin-left: 0px;
      width: 100%;
      height: 100%;
      top:60px;
    }
    li:last-of-type {
      position: relative;
    }
    li {
      display: inline-block;
    }
  }
}
</style>
