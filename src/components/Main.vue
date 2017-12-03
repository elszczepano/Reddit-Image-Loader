<template lang="html">
  <div class="container">
    <div class="top-bar-menu">
        <ul>
          <li class="title"><a href="">Reddit image loader <span class="fa fa-reddit-alien" aria-hidden="true"></span></a></li>
          <li>https://www.reddit.com/r/<input v-model="subreddit" type="text" id='subreddit' placeholder="subreddit-name" @keyup.enter="getURL"></li>
          <li>and hit ENTER!</li>
        </ul>
    </div>
    <h1>Your pictures <span class="fa fa-picture-o" aria-hidden="true"></span></h1>
    <div class="photo-container">
        <img v-bind:src="picture" class="photo" v-for="picture in pictures">
    </div>
    <ErrorDisplay v-if="showError" :errorValue="error" @close="showError = false"></ErrorDisplay>
  </div>
</template>

<script>
import ErrorDisplay from './ErrorDisplay.vue'
export default {
  data () {
    return {
      msg: 'Reddit json',
      pictures: [],
      subreddit: '',
      error: '',
      count: 1,
      showError: false
    }
  },
  name: 'Main',
  components: {
    ErrorDisplay
  },
  methods: {
    sendRequest (url) {
      fetch(url).then(response => response.json())
      .then(receivedData => receivedData['data']['children'])
      .then(list => { this.pictures = list.map(listItem => (listItem['data']['preview'] === undefined) ? listItem['data']['url'] : listItem['data']['preview']['images'][0]['source']['url']) })
      .catch(e => {
        this.error = e.message
        this.showError = true
      })
    },
    getURL () {
      this.pictures = []
      this.error = ''
      this.showError = false
      let url = `https://www.reddit.com/r/${this.subreddit}.json?count=${this.count}`
      this.sendRequest(url)
    }
  }
}
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
