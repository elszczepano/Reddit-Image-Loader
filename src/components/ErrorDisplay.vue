<template lang="html">
  <transition name="slide-fade">
    <div class="error-box">
      <header class="error-box-header">
        <span>Notice <span
          class="fa fa-exclamation-triangle"
          aria-hidden="true"
        />
        </span>
      </header>
      <div class="error-box-body">
        <p>{{ errorValue }}</p>
      </div>
      <hr>
      <footer class="error-box-footer">
        <button
          @click="$emit('close')"
          type="submit"
          name="button"
        >
          close
        </button>
      </footer>
    </div>
  </transition>
</template>
<script>
export default {
	name: 'ErrorDisplay',
	props: {
		showError: {
			type: Boolean,
			required: false,
			default: false
		},
		errorValue: {
			type: String,
			required: false,
			default: ''
		}
	},
};
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
