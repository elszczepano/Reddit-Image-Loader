<template lang="html">
	<div class="container">
		<div class="bar-menu bar-menu--cheatsheet">
			<a href="#">Reddit image loader<span class="fa fa-reddit-alien" aria-hidden="true"/></a>
			<h1 class="bar-menu__heading">Cheatsheet</h1>
		</div>
		<table>
			<thead>
				<tr>
					<th :key="header" v-for="header in Object.keys(subreddits)">{{header}}</th>
				</tr>
			</thead>
		</table>
	</div>
</template>

<script>
import { cheatSheet } from '../utils/cheatsheet';

export default {
	name: 'CheatSheetPage',
	data() {
		return {
			subreddits: cheatSheet
		};
	}
};
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
