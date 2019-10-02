import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
import App from './App';
import router from './router';
import 'font-awesome/scss/font-awesome.scss';

Vue.use( InfiniteLoading, {
	props: {
		spinner: 'spiral'
	},
	slots: {
		noResults: 'Provide a subreddit',
		noMore: 'No more results found'
	}
} );

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue( {
	el: '#app',
	components: { App },
	render: h => h( App ),
	router,
	template: '<App/>'
} );
