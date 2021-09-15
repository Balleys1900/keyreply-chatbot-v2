import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import apolloClient from './graphql/apollo';
import router from './router';
import store from './store';

Vue.use(VueApollo);
const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
});

Vue.use(ElementUI);

new Vue({
	apolloProvider,
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
