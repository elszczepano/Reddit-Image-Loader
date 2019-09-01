<template lang="html">
  <div :class="[isActive ? 'widget--active' : 'widget--inactive']" @click="isActive = !isActive" class="widget__container">
    <div class="widget-icon__container">
      <i class="widget-icon fa fa-file-text-o" aria-hidden="true"/>
    </div>
    <div class="widget-content">
      <h2 class="widget-content__heading">Popular subreddits:</h2>
      <ul class="widget-content__list">
        <li
          class="widget-content__list-item"
          v-for="subreddit in subreddits"
          :key="subreddit"
          @click="$emit('copy', subreddit)">{{ subreddit }}
        </li>
      </ul>
      <footer class="widget-footer">Find more <router-link class="widget-footer__link" to="/cheatsheet">there</router-link></footer>
    </div>
  </div>
</template>

<script>
import { cheatSheetShort } from '../utils/cheatsheet';

export default {
	name: 'Widget',
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
