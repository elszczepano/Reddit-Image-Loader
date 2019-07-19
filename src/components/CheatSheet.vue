<template lang="html">
  <div
    class="cheatsheet-container"
    :class="[isActive ? 'active' : 'inactive']"
    @click="isActive = !isActive"
  >
    <div class="cheatsheet-icon">
      <i
        class="fa fa-file-text-o"
        aria-hidden="true"
      />
    </div>
    <div class="cheatsheet-content">
      <h2>Popular subreddits:</h2>
      <ul>
        <li
          v-for="subreddit in subreddits"
          :key="subreddit"
          @click="$emit('copy', subreddit)"
        >
          {{ subreddit }}
        </li>
      </ul>
      <p>
        Find more
        <a
          href="http://redditlist.com/"
          target="_blank"
        >
          there
        </a>
      </p>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'CheatSheet',
      data () {
        return {
          isActive: false,
          subreddits: [
            'funny',
            'pics',
            'aww',
            'food',
            'gifs',
            'earthporn',
            'space',
            'creepy',
            'memes',
            'travel'
          ]
        }
      }
    }
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
