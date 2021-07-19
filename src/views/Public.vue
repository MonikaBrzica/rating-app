<template>
  <Rating v-bind:settings="settings"
          v-bind:emoticons="emoticons"/>
</template>

<script>
import Rating from '../../rating-app-client/src/views/rating'
export default {
  name: 'Public',
  components: {
    Rating
  },
  data () {
    return {

    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    },
    emoticons () {
      return this.$store.state.emoticons
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
