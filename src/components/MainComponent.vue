<template lang="html">
  <div class="container">
      <headroom speed="500">
          <header>
              <div class="top-bar-menu">
                  <ul>
                      <li class="title"><a href="">Reddit image loader <span class="fa fa-reddit-alien" aria-hidden="true"></span></a></li>
                      <li>https://www.reddit.com/r/
                          <input v-model="subreddit" type="text" id='subreddit' placeholder="subreddit-name" @keyup.enter="getURL">
                          <span class="encourage-desktop"> and hit ENTER!</span>
                          <span class="encourage-mobile"> and <button @click="getURL" class="nav-pill">SEARCH</button></span>
                      </li>
                      <li>
                          <button @click="getURL('prev')" :disabled="!this.before" class="nav-pill"><span class="fa fa-arrow-left" aria-hidden="true"></span> Prev</button>
                          <button @click="getURL('next')" :disabled="!this.after" class="nav-pill">Next <span class="fa fa-arrow-right" aria-hidden="true"></span></button>
                      </li>
                  </ul>
              </div>
          </header>
      </headroom>
    <h1>Your pictures <span class="fa fa-picture-o" aria-hidden="true"></span></h1>
    <div class="photo-container">
        <transition name="slide-fade" v-for="picture in pictures" :key="picture.url">
            <img :src="picture" class="photo">
        </transition>
    </div>
    <error-display v-if="showError" :errorValue="error" @close="showError = false" />
  </div>
</template>

<script>
import ErrorDisplay from './ErrorDisplay.vue'
import { headroom } from 'vue-headroom'
import API from '../api'
export default {
  data () {
    return {
      pictures: [],
      subreddit: '',
      error: '',
      count: 0,
      showError: false,
      after: false,
      before: false
    }
  },
  name: 'MainComponent',
  components: {
    ErrorDisplay,
    headroom
  },
  methods: {
    check_format (url) {
      if (url.slice(url.length - 4, url.length - 3) === '.') return true
      return false
    },
    sendRequest (url) {
      API.get(url)
          .then(response => {
            this.before = response.data.data.before
            this.after = response.data.data.after
            return response.data.data.children
          })
          .then(pictures => {
            pictures.forEach((key) => {
              if (this.check_format(key.data.url)) this.pictures.push(key.data.url)
            })
          })
      .catch(error => {
        this.error = error.message
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
