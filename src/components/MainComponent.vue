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
		<infinite-loading v-if="isRunning" @infinite="createRequestURL"></infinite-loading>
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
			isRunning: false,
			errorMessage: '',
			headroomSpeed: 500,
			pictures: [],
			allowedFormats: [ 'jpg', 'jpeg', 'png', 'gif' ],
			showError: false,
			subreddit: '',
			URLAfter: null
		};
	},
	mounted() {
		this.getSubredditFromURL();
	},
	watch: {
		$route() {
			this.subreddit = this.$route.query.subreddit;
			this.restartApp();
			this.createRequestURL( this.$route.query.subreddit );
		}
	},
	methods: {
		loadSubreddit() {
			if ( this.$route.query.subreddit !== this.subreddit ) {
				this.$router.push( { query: { subreddit: this.subreddit } } );
				this.createRequestURL();
			}
		},
		createRequestURL( state ) {
			this.isRunning = true;

			if ( this.pictures.length ) {
				this.sendRequest(
					state,
					`https://www.reddit.com/r/${ this.subreddit }.json?after=${ this.URLAfter }`
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
		sendRequest( state, url ) {
			API.get( url )
				.then( ( { data } ) => {
					this.URLAfter = data.data.after;
					return data.data.children;
				} )
				.then( pictures => {
					pictures.forEach( ( { data } ) => {
						const { url } = data;
						if ( this.checkImageFormat( url ) || this.pictures.includes( url ) ) {
							this.pictures.push( url );
						}
					} );

					if ( state && state.loaded ) {
						state.loaded();
					}
				} )
				.catch( error => {
					this.errorMessage = error.message;
					this.restartApp();
					this.showError = true;

					if ( state && state.complete ) {
						state.complete();
					}
				} );
		},
		checkImageFormat( url ) {
			const urlParts = url.split( '.' );
			return this.allowedFormats.includes( urlParts[ urlParts.length - 1 ] );
		},
		restartApp() {
			this.errorMessage = '';
			this.pictures = [];
			this.showError = false;
			this.isRunning = false;
		}
	}
};
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
