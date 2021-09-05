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

// Import the plugin here
import Auth from './auth';

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
});

// createApp(App)
//   .use(Auth0Plugin, {
//     domain,
//     clientId,
//     onRedirectCallback: (appState: any) => {
//       router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
//     }
//   })
//   .use(apolloProvider)
//   .use(ElementPlus)
//   .use(store)
//   .use(router)
//   .mount('#app');

async function init() {
  const AuthPlugin = await Auth.init({
    onRedirectCallback: (appState: any) => {
      router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
    }
  });

  createApp(App)
    .use(AuthPlugin)
    .use(router)
    .use(apolloProvider)
    .use(ElementPlus)
    .use(store)
    .mount('#app');
}

init();
