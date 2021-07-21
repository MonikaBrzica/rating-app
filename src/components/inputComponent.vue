<template>
  <div class="input-container">
    <fieldset>
      <legend>{{ data.legend }}</legend>
      <input v-bind:type="data.type"
             v-bind:value=data.value
             @change.stop="updateData (data.name, $event.target.value)">
    </fieldset>
    <p>{{ data.text }}</p>
  </div>
</template>

<script>
export default {
  name: 'inputComponent',
  props: {
    data: Object
  },
  data () {
    return {
    }
  },
  methods: {
    updateData (name, value) {
      if (name === 'numOfEmoticons') {
        this.$emit('updateEmotions', parseInt(value))
      }
      if (name === 'msg') {
        this.$emit('updateSettings', { name: name, value: value })
      } else {
        this.$emit('updateSettings', { name: name, value: parseInt(value) })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-container{
  flex-basis: calc(50% - 24px);
  min-width: 280px;
  fieldset{
    border-radius: 5px;
    border-color: rgba(255,255,255,0.2);
    padding: 0;
    legend{
      color: rgba(255, 255, 255, 0.5);
      font-family: Roboto-Medium;
      font-size: 12px;
      line-height: 16px;
      padding: 0 8px;
      margin-left: 8px;
    }
    input {
      background-color: transparent;
      outline: none;
      border: none;
      width: 100%;
      height: 100%;
      padding: 9px 16px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
  }
  p{
    color: rgba(255, 255, 255, 0.5);
    font-family: Roboto-Regular;
    font-size: 12px;
    line-height: 16px;
    margin: 4px;
  }
}

</style>
