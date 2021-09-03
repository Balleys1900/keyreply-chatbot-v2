// Apollo
import { createApolloProvider } from '@vue/apollo-option';
import apolloClient from './graphql/apollo-client';
// Element UI Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// Vue instance
import { createApp } from 'vue';
import App from './App.vue';
// Router
import router from './router';
// Vuex
import store from './store';

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
});

createApp(App)
  .use(apolloProvider)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app');
