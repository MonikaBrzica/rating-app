<template>
  <div class="nav-container">
    <NavLink v-bind:data="{id: item.id, src: item.src, text: item.text, link: item.link }"
             v-for="item in nav"
             v-bind:key="item.id"
    />
  </div>
</template>
<script>
import NavLink from '../components/navLink'
export default {
  name: 'LeftNav',
  components: {
    NavLink
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
          link: '/settings'
        }
      ]
    }
  }
}
</script>
<style>
.nav-container {
  background-color: #2D3038;
  width: 100px;
  height: 100%;
}
li:last-of-type {
  position: absolute;
  bottom: 0;
}
</style>
