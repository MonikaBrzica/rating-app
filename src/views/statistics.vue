<template>
  <div class="statistics">
    <LeftNav />
    <router-view />
    <RightNav />
  </div>
</template>
<script>
import LeftNav from '../components/leftNav'
import RightNav from '../components/rightNav'
export default {
  name: 'Statistics',
  components: {
    LeftNav,
    RightNav
  }
}
</script>

<style>
.statistics {
  height: 100vh;
  width: 100%;
}
</style>
