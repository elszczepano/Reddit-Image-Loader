<template lang="html">
  <div class="top-bar-menu">
      <ul>
        <li class="title">Reddit image loader</li>
        <li>https://reddit.com/r/<input type="text" id='subreddit' placeholder="your-path" v-on:keyup.enter="getURL()"></li>
        <li>and hit ENTER!</li>
      </ul>
  </div>
</template>
<script>
export default {
  name: 'Menu',
  data () {
    return {
      msg: 'Reddit json'
    }
  },
  methods: {
    getURL: function () {
      const field = document.querySelector('#subreddit').value
      console.log(field)
    }
  }
}
</script>
<style lang="scss" src="../assets/scss/menu.scss" scoped>
</style>
