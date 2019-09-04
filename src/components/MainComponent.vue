<template lang="html">
	<div class="container">
		<headroom :speed="headroomSpeed">
			<header class="bar-menu">
				<ul class="bar-menu__list">
					<li class="bar-menu__list__item title">
						<a href="#">Reddit image loader<span class="fa fa-reddit-alien" aria-hidden="true"/></a>
					</li>
					<li class="bar-menu__list__item">https://www.reddit.com/r/
						<input
							ref="subredditInput"
							v-model="subreddit"
							@keyup.enter="createRequestURL"
							id="subreddit" type="text"
							placeholder="subreddit-name"
						>
						<span class="encourage-desktop"> and hit ENTER!</span>
						<span class="encourage-mobile">and<button @click="createRequestURL" class="nav-pill">SEARCH</button></span>
					</li>
					<li class="bar-menu__list__item">
						<button :disabled="!URLBefore" @click="createRequestURL('prev')" class="nav-pill">
							<span class="fa fa-arrow-left" aria-hidden="true"/>Prev
						</button>
						<button :disabled="!URLAfter" @click="createRequestURL('next')" class="nav-pill">
							Next<span class="fa fa-arrow-right" aria-hidden="true"/>
						</button>
					</li>
				</ul>
			</header>
		</headroom>
		<h1 class="photos-heading">Your pictures<span class="fa fa-picture-o" aria-hidden="true"/></h1>
		<div class="photos-container">
			<transition v-for="picture in pictures" :key="picture.url" name="slide-fade">
				<img :src="picture" class="photos-container__photo">
			</transition>
		</div>
		<error-display v-if="showError" :error-value="error" @close="showError = false"/>
		<widget />
	</div>
</template>

<script>
import { headroom } from 'vue-headroom';
import ErrorDisplay from './ErrorDisplay.vue';
import Widget from './Widget.vue';
import API from '../api';

export default {
	name: 'MainComponent',
	components: {
		ErrorDisplay,
		Widget,
		headroom
	},
	data() {
		return {
			error: '',
			headroomSpeed: 500,
			pictures: [],
			showError: false,
			subreddit: '',
			URLAfter: null,
			URLBefore: null,
			URLCount: 0
		};
	},
	mounted() {
		this.getSubredditFromURL();
	},
	watch: {
		$route() {
			this.getSubredditFromURL();
		}
	},
	methods: {
		getSubredditFromURL() {
			const query = this.$route.query || {};
			const subreddit = query.subreddit;
			if ( subreddit ) {
				this.$refs.subredditInput.value = subreddit;
				this.subreddit = subreddit;
				this.createRequestURL( subreddit );
			}
		},
		checkImageFormat( url ) {
			return url.slice( url.length - 4, url.length - 3 ) === '.';
		},
		sendRequest( url ) {
			API.get( url )
				.then( response => {
					this.URLBefore = response.data.data.before;
					this.URLAfter = response.data.data.after;
					return response.data.data.children;
				} )
				.then( pictures => {
					pictures.forEach( key => {
						if ( this.checkImageFormat( key.data.url ) ) {
							this.pictures.push( key.data.url );
						}
					} );
				} )
				.catch( error => {
					this.error = error.message;
					this.showError = true;
					this.URLBefore = null;
					this.URLAfter = null;
				} );
		},
		createRequestURL( param ) {
			this.pictures = [];
			this.error = '';
			this.showError = false;
			let url = '';
			switch ( param ) {
				case 'prev':
					if ( this.URLCount % 5 === 0 ) {
						this.URLCount++;
					}
					else {
						this.URLCount -= 25;
					}
					url = `https://www.reddit.com/r/${ this.subreddit }.json?count=${ this.URLCount }&before=${ this.URLBefore }`;
					break;
				case 'next':
					this.URLCount += 25;
					url = `https://www.reddit.com/r/${ this.subreddit }.json?count=${ this.URLCount }&after=${ this.URLAfter }`;
					break;
				default:
					url = `https://www.reddit.com/r/${ this.subreddit }.json`;
			}
			this.sendRequest( url );
		}
	}
};
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
