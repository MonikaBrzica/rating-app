<template>
  <div class="settings-container">
    <div class="title-container">
      <p class="title">Settings</p>
      <p>X</p>
    </div>
    <div class="separator"></div>
    <div class="main-container">
      <div class="emoticons-preview-container">
        <p>Emotions preview</p>
        <img
          v-for="item in this.emotionsArr"
          v-bind:key="item.id"
          :src="require('../assets/' + item)"
          alt="Emoticon"
        />
      </div>
      <Input v-for="item in this.inputsArr"
             v-bind:key="item.name"
             v-bind:data="item"
             @updateEmotions="changeSelectedEmotionsNum"
             @updateSettings="updateSettings"/>
    </div>
  </div>
</template>

<script>
import Input from './inputComponent'
import { HTTP } from '../../api/axios'
export default {
  name: 'Settings',
  components: {
    Input
  },
  data: function () {
    return {
    }
  },
  computed: {
    emotionsArr () {
      return this.$store.getters.getEmotionsArr(this.emotionsSelected)
    },
    inputsArr () {
      return [
        {
          name: 'msg',
          legend: 'Thank you message',
          text: '',
          type: 'text',
          value: this.$store.getters.getSettings.msg
        },
        {
          name: 'numOfEmoticons',
          legend: 'Number of emotions',
          text: 'Enter number from 3-5',
          type: 'number',
          value: this.$store.getters.getSettings.numOfEmoticons
        },
        {
          name: 'timeout',
          legend: 'Message timeout',
          text: 'Can be from 0-15',
          type: 'number',
          value: this.$store.getters.getSettings.timeout
        }]
    },
    emotionsSelected () {
      return this.settings.numOfEmoticons
    },
    settings () {
      return this.$store.getters.getSettings
    }
  },
  methods: {
    changeSelectedEmotionsNum (event) {
      this.settings.numOfEmoticons = event
    },
    updateSettings (data) {
      const updatedSettings = this.settings
      for (const property in updatedSettings) {
        if (property === data.name) {
          updatedSettings[property] = data.value
        }
      }
      HTTP.put('/rating/settings', updatedSettings)
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-container {
  width: 1015px;
  height: 100vh;
  box-sizing: border-box;
  background-color: #2D3038;
  padding: 2rem 3rem;
  .title-container {
    padding: 34px 0 34px 16px;
    display: flex;
    justify-content: space-between;
    p {
      color: rgba(255, 255, 255, 0.85);
      font-family: Roboto-Bold;
      font-size: 24px;
      line-height: 29px;
    }
  }
  .separator {
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 1px 0 0 rgba(128, 134, 139, 0.3),
    0 -1px 0 0 rgba(128, 134, 139, 0.3);
    height: 1px;
    margin-bottom: 40px;
  }
  .main-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 24px;
    row-gap: 20px;
    .emoticons-preview-container {
      color: rgba(255, 255, 255, 0.5);
      flex-basis: calc(50% - 24px);
      img {
        height: 24px;
        width: 24px;
        margin-right: 12px;
      }
      font-family: Roboto-Medium;
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>
