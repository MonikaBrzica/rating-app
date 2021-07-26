<template>
  <div class="nav-container">
    <img class="logo"
         src="../assets/logo.png"
         alt="logo">
    <NavLink v-bind:data="{id: item.id, src: item.src, text: item.text, link: item.link }"
             v-for="item in nav"
             v-bind:key="item.id"
             v-on:show="itemClicked()"/>
    <div class="set-container"
         v-show="showModal">
      <Settings v-on:close="itemClicked()"/>
    </div>
  </div>
</template>
<script>
import NavLink from '../components/navLink'
import Settings from '../components/Settings'
export default {
  name: 'LeftNav',
  components: {
    NavLink,
    Settings
  },
  data () {
    return {
      nav: [
        {
          id: 1,
          text: 'Today',
          src: 'view-dashboard.svg',
          link: '/'
        },
        {
          id: 2,
          text: 'Reports',
          src: 'file-document.svg',
          link: '/reports'
        },
        {
          id: 3,
          text: 'Settings',
          src: 'cog.svg',
          link: ''
        }
      ],
      showModal: false
    }
  },
  methods: {
    itemClicked () {
      this.showModal = !this.showModal
    }
  }
}
</script>
<style scoped>
.nav-container {
  background-color: #2D3038;
  width: 100px;
  height: 100%;
}
img {
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
li:last-of-type {
  position: absolute;
  bottom: 0;
}
@media only screen and (max-width: 768px) {
  .nav-container {
    width: calc(100% - 64px);
    height: 60px;
    position: absolute;
    display: flex;
  }
  img {
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
</style>
