<template lang="html">
<div class="error-box">
  <header class="error-box-header">
    <span>Notice <span class="fa fa-exclamation-triangle" aria-hidden="true"></span></span>
  </header>
  <div class="error-box-body">
      <p>{{this.errorValue}}</p>
  </div>
  <hr>
  <footer class="error-box-footer">
    <button type="submit" name="button" @click="hideElement">close</button>
  </footer>
</div>
</template>

<script>
export default {
  name: 'ErrorDisplay',
  props: [
    'errorValue',
    'showError'
  ],
  methods: {
    hideElement () {
      this.$emit(false, this.showError)
    }
  }
}
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
