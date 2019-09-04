<template lang="html">
	<transition name="slide-fade">
		<div class="notification-box">
			<header class="notification-box__heading">
				<span>Notice <span class="fa fa-exclamation-triangle" aria-hidden="true"/></span>
			</header>
			<div class="notification-box__content notification-content">
				<p class="notification-content__text">{{ errorValue }}</p>
			</div>
			<hr class="notification-box__breaking-line">
			<footer class="notification-box__footer notification-footer">
				<button class="notification-footer__button" @click="$emit('close')" type="submit" name="button">close</button>
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
