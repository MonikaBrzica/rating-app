<template>
  <div class="reports">
    <LeftNav/>
    <RightNav/>
  </div>
</template>
<script>
import LeftNav from '../components/leftNav'
import RightNav from '../components/rightNav'
export default {
  name: 'Reports',
  components: {
    LeftNav,
    RightNav
  }
}
</script>
<style lang="scss">
.reports {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
