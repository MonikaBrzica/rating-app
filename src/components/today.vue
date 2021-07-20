<template>
  <div class="today">
    <LeftNav />
  </div>
</template>
<script>
import LeftNav from '../components/leftNav'
export default {
  name: 'Today',
  components: {
    LeftNav
  }
}
</script>
<style>
.today{
  height: 100vh;
  width: 100%;
}
</style>
