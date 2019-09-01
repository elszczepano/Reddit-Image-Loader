<template lang="html">
  <div
    :class="[isActive ? 'active' : 'inactive']"
    @click="isActive = !isActive"
    class="cheatsheetwidget-container"
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
import { cheatSheetShort } from '../utils/cheatsheet';

export default {
	name: 'CheatSheetWidget',
	data() {
		return {
			isActive: false,
			subreddits: cheatSheetShort
		};
	}
};
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
