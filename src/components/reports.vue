<template>
  <div class="reports">
    <LeftNav/>
    <div class="main-reports">
  </div>
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
<style lang="scss" scoped>
.reports {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .main-reports {
    width: calc(100% - 164px);
    order:2;
  }
}
@media only screen and (max-width: 768px) {
  .reports {
  }
}
</style>
