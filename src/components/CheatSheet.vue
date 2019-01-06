<template lang="html">
    <div class="cheatsheet-container" @click="isActive = !isActive" v-bind:class="[isActive ? 'active' : 'inactive']">
      <div class="cheatsheet-icon"><i class="fa fa-file-text-o" aria-hidden="true"></i></div>
      <div class="cheatsheet-content">
        <h2>Popular subreddits:</h2>
        <ul>
          <li>funny</li>
          <li>pics</li>
          <li>aww</li>
          <li>food</li>
          <li>gifs</li>
          <li>earthporn</li>
          <li>space</li>
          <li>creepy</li>
          <li>memes</li>
          <li>travel</li>
        </ul>
        <p>Find more <a href="http://redditlist.com/" target="_blank">there</a></p>
      </div>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          isActive: false
        }
      },
      name: 'CheatSheet'
    }
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
