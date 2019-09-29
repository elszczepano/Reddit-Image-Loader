<template lang="html">
	<div class="container">
		<headroom :speed="headroomSpeed">
			<header class="bar-menu">
				<ul class="bar-menu__list">
					<li class="bar-menu__list__item bar-menu__title">
						<router-link to="/">Reddit Image Loader<span class="fa fa-reddit-alien" aria-hidden="true"/></router-link>
					</li>
					<li class="bar-menu__list__item">https://www.reddit.com/r/
						<input
							ref="subredditInput"
							v-model="subreddit"
							@keyup.enter="loadSubreddit"
							id="subreddit" type="text"
							placeholder="subreddit-name"
						>
						<span class="encourage-desktop"> and hit ENTER!</span>
						<span class="encourage-mobile">
							and<button @click="loadSubreddit" class="nav-pill nav-pill--search">search</button>
						</span>
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
		<error-popup v-if="showError" :error-value="errorMessage" @close="showError = false"/>
		<widget />
		<infinite-loading @infinite="createRequestURL"></infinite-loading>
	</div>
</template>

<script>
import { headroom } from 'vue-headroom';
import ErrorPopup from './ErrorPopup.vue';
import Widget from './Widget.vue';
import API from '../api';

export default {
	name: 'MainComponent',
	components: {
		ErrorPopup,
		Widget,
		headroom
	},
	data() {
		return {
			errorMessage: '',
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
		loadSubreddit() {
			if ( !this.pictures.length || this.$route.query.subreddit !== this.subreddit ) {
				this.createRequestURL();
			}
		},
		createRequestURL( state ) {
			if ( this.$route.query.subreddit !== this.subreddit ) {
				this.$router.push( { query: { subreddit: this.subreddit } } );
				this.pictures = [];
			}

			this.errorMessage = '';
			this.showError = false;

			if ( this.pictures.length ) {
				this.URLCount += 25;
				this.sendRequest(
					state,
					`https://www.reddit.com/r/${ this.subreddit }.json?count=${ this.URLCount }&after=${ this.URLAfter }`
				);
			} else {
				this.sendRequest( state, `https://www.reddit.com/r/${ this.subreddit }.json` );
			}
		},
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
		sendRequest( state, url ) {
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

					if ( state && state.loaded ) {
						state.loaded();
					}
				} )
				.catch( error => {
					this.errorMessage = error.message;
					this.showError = true;
					this.URLBefore = null;
					this.URLAfter = null;

					if ( state && state.complete ) {
						state.complete();
					}
				} );
		}
	}
};
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
