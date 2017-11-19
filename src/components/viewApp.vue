<template lang="html">
  <div class="top-bar-menu">
    <ul>
      <li class="title">Reddit image loader</li>
      <li>https://reddit.com/r/<input type="text" placeholder=""></li>
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

<style lang="scss" src="../assets/scss/view.scss" scoped>
</style>
