<template>
  <div class="statistics">
    <leftNav />
  </div>
</template>
<script>
import leftNav from '../components/leftNav'
export default {
  name: 'statistics',
  components: {
    leftNav
  }
}
</script>

<style>
.statistics {
  height: 100vh;
  width: 100%;
}
</style>
