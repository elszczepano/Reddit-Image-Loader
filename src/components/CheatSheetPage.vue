<template lang="html">
	<div class="container">
		<div class="bar-menu bar-menu__cheatsheet">
			<router-link to="/" class="bar-menu__title">
				Reddit Image Loader<span class="fa fa-reddit-alien" aria-hidden="true"/>
			</router-link>
			<h1 class="bar-menu__heading">Cheatsheet</h1>
		</div>
		<div class="cheatsheet-table__wrapper">
			<table class="cheatsheet-table">
				<tr :key="header" v-for="header in Object.keys( subreddits )">
					<th>{{ header }}</th>
					<td>
						<ul class="cheatsheet-list">
							<router-link
								class="cheatsheet-list__item"
								tag="li"
								:key="subreddit"
								:to="{ path: '/', query: { subreddit: subreddit } }"
								v-for="subreddit in subreddits[ header ]"
							>{{ subreddit }}</router-link>
						</ul>
					</td>
				</tr>
			</table>
		</div>
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
