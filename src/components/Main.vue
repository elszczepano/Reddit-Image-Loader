<template lang="html">
  <div class="container">
    <div class="top-bar-menu">
        <ul>
          <li class="title">Reddit image loader</li>
          <li>https://reddit.com/r/<input type="text" id='subreddit' placeholder="your-path" v-model="subreddit" v-on:keyup.enter="getURL"></li>
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
    sendRequest: (url) => {
      this.$http.get(url).then(response => {
        console.log(response.status)
      })
    },
    getURL: () => {
      let url = `https://reddit.com/r/${this.subreddit.value}.json`
      this.sendRequest(url)
    }
  }
}
</script>

<style lang="scss" src="../assets/scss/content.scss" scoped>
</style>
