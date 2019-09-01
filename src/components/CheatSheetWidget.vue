<template lang="html">
  <div
    :class="[isActive ? 'active' : 'inactive']"
    class="cheatsheetwidget-container"
    @click="isActive = !isActive"
  >
    <div class="cheatsheetwidget-icon">
      <i
        class="fa fa-file-text-o"
        aria-hidden="true"
      />
    </div>
    <div class="cheatsheetwidget-content">
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
      name: 'CheatSheetWidget',
      data() {
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
        };
      }
    };
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
