<template>
  <div class="input-container">
    <fieldset>
      <legend>{{ data.legend }}</legend>
      <input v-bind:type="data.type" v-bind:placeholder=data.placeholder v-bind:value="this.inputValue">
    </fieldset>
    <p>{{ data.text }}</p>
  </div>
</template>

<script>
export default {
  name: 'input',
  props: {
    data: Object
  },
  data () {
    return {
      inputValue: null
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset{
  border-radius: 5px;
  border-color: rgba(255,255,255,0.2);
  padding: 0;
  legend{
    color: rgba(255, 255, 255, 0.5);
    font-family: Roboto-Medium;
    font-size: 12px;
    line-height: 16px;
    padding: 0 10px;
    margin-left: 16px;
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
}
</style>
