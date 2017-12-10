<template lang="html">
  <div class="container">
    <div class="top-bar-menu">
        <ul>
          <li class="title"><a href="">Reddit image loader <span class="fa fa-reddit-alien" aria-hidden="true"></span></a></li>
          <li>https://www.reddit.com/r/<input v-model="subreddit" type="text" id='subreddit' placeholder="subreddit-name" @keyup.enter="getURL"></li>
          <li>and hit ENTER!</li>
          <li class="nav-pill" @click="getURL('prev')" v-if="this.before"><span class="fa fa-arrow-left" aria-hidden="true"></span> Prev</li>
          <li class="nav-pill" @click="getURL('next')" v-if="this.after">Next <span class="fa fa-arrow-right" aria-hidden="true"></span></li>
        </ul>
    </div>
    <h1>Your pictures <span class="fa fa-picture-o" aria-hidden="true"></span></h1>
    <div class="photo-container">
        <transition name="slide-fade" v-for="picture in pictures" :key="picture.url">
          <img v-bind:src="picture" class="photo">
        </transition>
    </div>
    <error-display v-if="showError" :errorValue="error" @close="showError = false" />
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
      count: 0,
      showError: false,
      after: false,
      before: false
    }
  },
  name: 'Main',
  components: {
    ErrorDisplay
  },
  methods: {
    sendRequest (url) {
      fetch(url).then(response => response.json())
      .then(receivedData => {
        this.before = receivedData['data']['before']
        this.after = receivedData['data']['after']
        return receivedData['data']['children']
      })
      .then(list => { this.pictures = list.map(listItem => (listItem['data']['preview'] === undefined) ? listItem['data']['url'] : listItem['data']['preview']['images'][0]['source']['url']) })
      .catch(e => {
        this.error = e.message
        this.showError = true
        this.before = false
        this.after = false
      })
    },
    getURL (param) {
      this.pictures = []
      this.error = ''
      this.showError = false
      let url = ''
      switch (param) {
        case 'prev':
          if (this.count % 5 === 0) {
            this.count += 1
          } else this.count -= 25
          url = `https://www.reddit.com/r/${this.subreddit}.json?count=${this.count}&before=${this.before}`
          break
        case 'next':
          this.count += 25
          url = `https://www.reddit.com/r/${this.subreddit}.json?count=${this.count}&after=${this.after}`
          break
        default:
          url = `https://www.reddit.com/r/${this.subreddit}.json`
      }
      this.sendRequest(url)
    }
  }
}
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
