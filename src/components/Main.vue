<template lang="html">
  <div class="container">
    <div class="top-bar-menu">
        <ul>
          <li class="title">Reddit image loader</li>
          <li>https://reddit.com/r/<input v-model="subreddit" type="text" id='subreddit' placeholder="your-path" v-on:keyup.enter="getURL"></li>
          <li>and hit ENTER!</li>
        </ul>
    </div>
    <div class="photo-container">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Reddit json',
      subreddit: ''
    }
  },
  methods: {
    sendRequest (url) {
      this.$http.get(url, {responseType: 'json'}).then(response => {
        console.log(response.status)
      })
    },
    getURL () {
      let url = `https://reddit.com/r/${this.subreddit}.json`
      this.sendRequest(url)
    }
  }
}
</script>

<style lang="scss" src="../assets/scss/content.scss" scoped>
</style>
