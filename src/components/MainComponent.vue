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
					<li class="bar-menu__list__item">
						<button :disabled="!URLBefore || showError" @click="createRequestURL( 'prev' )" class="nav-pill">
							<span class="fa fa-arrow-left" aria-hidden="true"/>Prev
						</button>
						<button :disabled="!URLAfter || showError" @click="createRequestURL( 'next' )" class="nav-pill">
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
		<error-popup v-if="showError" :error-value="errorMessage" @close="showError = false"/>
		<widget />
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
			allowedFormats: [ 'jpg', 'jpeg', 'png', 'gif' ],
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
			this.subreddit = this.$route.query.subreddit;
			this.URLCount = 0;
			this.sendRequest( `https://www.reddit.com/r/${ this.subreddit }.json` );
		}
	},
	methods: {
		loadSubreddit() {
			if ( this.$route.query.subreddit !== this.subreddit ) {
				this.$router.push( { query: { subreddit: this.subreddit } } );
			}
		},
		createRequestURL( flag ) {
			switch ( flag ) {
				case 'prev':
					if ( this.URLCount % 5 === 0 ) {
						this.URLCount++;
					} else {
						this.URLCount -= 25;
					}

					this.sendRequest(
						`https://www.reddit.com/r/${ this.subreddit }.json?count=${ this.URLCount }&before=${ this.URLBefore }`
					);
					break;
				case 'next':
					this.URLCount += 25;
					this.sendRequest(
						`https://www.reddit.com/r/${ this.subreddit }.json?count=${ this.URLCount }&after=${ this.URLAfter }`
					);
					break;
				default:
					this.sendRequest( `https://www.reddit.com/r/${ this.subreddit }.json` );
			}
		},
		getSubredditFromURL() {
			const query = this.$route.query || {};
			const subreddit = query.subreddit;
			if ( subreddit ) {
				this.$refs.subredditInput.value = subreddit;
				this.subreddit = subreddit;
				this.sendRequest( `https://www.reddit.com/r/${ subreddit }.json` );
			}
		},
		async sendRequest( url ) {
			this.pictures = [];
			this.showError = false;

			try {
				const { data } = await API.get( url );

				this.URLAfter = data.data.after;
				this.URLBefore = data.data.before;

				data.data.children.forEach( ( { data } ) => {
					const { url } = data;

					if ( this.checkImageFormat( url ) ) {
						this.pictures.push( url );
					}
				} );
			} catch ( error ) {
				this.errorMessage = error.message;
				this.showError = true;
				this.URLBefore = null;
				this.URLAfter = null;
				this.URLCount = 0;
			}
		},
		checkImageFormat( url ) {
			const urlParts = url.split( '.' );
			return this.allowedFormats.includes( urlParts[ urlParts.length - 1 ] );
		}
	}
};
</script>

<style lang="scss" src="../assets/scss/style.scss">
</style>
