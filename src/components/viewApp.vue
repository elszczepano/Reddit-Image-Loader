<template lang="html">
  <div class="top-bar-menu">
    <ul>
      <li><h1>Reddit image loader</h1></li>
      <li><input type="text" placeholder=""></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'viewApp',
  data () {
    return {
      msg: 'Reddit json'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/view.scss";
</style>
