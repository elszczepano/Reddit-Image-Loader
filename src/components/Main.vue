<template lang="html">
  <div class="container">
    <div class="top-bar-menu">
        <ul>
          <li class="title">Reddit image loader</li>
          <li>https://www.reddit.com/r/<input v-model="subreddit" type="text" id='subreddit' placeholder="your-path" v-on:keyup.enter="getURL"></li>
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
      fetch(url).then(function (response) {
        return response.json()
      }).then(function (receivedData) {
        console.log(receivedData['data']['children'])
        return receivedData['data']['children']
      }).then(function (list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i]['data']['post_hint'] === 'image') {
            console.log(list[i]['data']['url'])
          }
        }
      })
    },
    getURL () {
      let url = `https://www.reddit.com/r/${this.subreddit}.json`
      this.sendRequest(url)
    }
  }
}
</script>

<style lang="scss" src="../assets/scss/content.scss" scoped>
</style>
