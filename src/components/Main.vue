<template lang="html">
  <div class="container">
    <div class="top-bar-menu">
        <ul>
          <li class="title">Reddit image loader</li>
          <li>https://www.reddit.com/r/<input v-model="subreddit" type="text" id='subreddit' placeholder="your-path" @keyup.enter="getURL"></li>
          <li>and hit ENTER!</li>
        </ul>
    </div>
    <div class="photo-container">
        <img v-bind:src="picture" class="photo" v-for="picture in pictures">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Reddit json',
      pictures: [],
      subreddit: ''
    }
  },
  methods: {
    sendRequest (url) {
      fetch(url).then(response => response.json())
      .then(receivedData => receivedData['data']['children'])
      .then(list => {
        this.pictures = list.map(listItem => {
          if (listItem['data']['post_hint'] === 'image') {
            return listItem['data']['url']
          }
        })
      }).catch(e => alert(`Subreddit ${this.subreddit} not found`))
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
