<template lang="html">
  <div class="container">
    <headroom :speed="speed">
      <header>
        <div class="top-bar-menu">
          <ul>
            <li class="title">
              <a href="#">
                Reddit image loader
                <span
                  class="fa fa-reddit-alien"
                  aria-hidden="true"
                />
              </a>
            </li>
            <li>
              https://www.reddit.com/r/
              <input
                id="subreddit"
                v-model="subreddit"
                type="text"
                placeholder="subreddit-name"
                @keyup.enter="getURL"
              >
              <span class="encourage-desktop"> and hit ENTER!</span>
              <span
                class="encourage-mobile"
              >
                and
                <button
                  class="nav-pill"
                  @click="getURL"
                >
                  SEARCH
                </button>
              </span>
            </li>
            <li>
              <button
                :disabled="!before"
                class="nav-pill"
                @click="getURL('prev')"
              >
                <span
                  class="fa fa-arrow-left"
                  aria-hidden="true"
                />
                Prev
              </button>
              <button
                :disabled="!after"
                class="nav-pill"
                @click="getURL('next')"
              >
                Next
                <span
                  class="fa fa-arrow-right"
                  aria-hidden="true"
                />
              </button>
            </li>
          </ul>
        </div>
      </header>
    </headroom>
    <h1>
      Your pictures
      <span
        class="fa fa-picture-o"
        aria-hidden="true"
      />
    </h1>
    <div class="photo-container">
      <transition
        v-for="picture in pictures"
        :key="picture.url"
        name="slide-fade"
      >
        <img
          :src="picture"
          class="photo"
        >
      </transition>
    </div>
    <error-display
      v-if="showError"
      :error-value="error"
      @close="showError = false"
    />
    <cheat-sheet @copy="copyValue" />
  </div>
</template>

<script>
import ErrorDisplay from './ErrorDisplay.vue';
import CheatSheet from './CheatSheet.vue';
import { headroom } from 'vue-headroom';
import API from '../api';

export default {
  name: 'MainComponent',
  components: {
    ErrorDisplay,
    CheatSheet,
    headroom
  },
  data () {
    return {
      pictures: [],
      speed: 500,
      subreddit: '',
      error: '',
      count: 0,
      showError: false,
      after: false,
      before: false
    };
  },
  methods: {
    copyValue (value) {
      this.subreddit = value;
      this.getURL(value);
    },
    checkFormat (url) {
      return url.slice(url.length - 4, url.length - 3) === '.';
    },
    sendRequest (url) {
      API.get(url)
          .then(response => {
            this.before = response.data.data.before;
            this.after = response.data.data.after;
            return response.data.data.children;
          })
          .then(pictures => {
            pictures.forEach((key) => {
              if (this.checkFormat(key.data.url)) {
                  this.pictures.push(key.data.url);
              }
            });
          })
      .catch(error => {
        this.error = error.message;
        this.showError = true;
        this.before = false;
        this.after = false;
      });
    },
    getURL (param) {
      this.pictures = [];
      this.error = '';
      this.showError = false;
      let url = '';
      switch (param) {
        case 'prev':
          if (this.count % 5 === 0) {
              this.count++;
          }
          else {
              this.count -= 25;
          }
          url = `https://www.reddit.com/r/${this.subreddit}.json?count=${this.count}&before=${this.before}`;
          break;
        case 'next':
          this.count += 25;
          url = `https://www.reddit.com/r/${this.subreddit}.json?count=${this.count}&after=${this.after}`;
          break;
        default:
          url = `https://www.reddit.com/r/${this.subreddit}.json`;
      }
      this.sendRequest(url);
    }
  }
};
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
