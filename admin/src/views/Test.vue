<template>
  <div>
    <h1>Test Auth</h1>
    <p>{{ token }}</p>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  setup() {
    //    isAuthenticated: computed(() => state.isAuthenticated),
    // loading: computed(() => state.loading),
    // user: computed(() => state.user),
    // getIdTokenClaims,
    // getTokenSilently,
    // getTokenWithPopup,
    // handleRedirectCallback,
    // loginWithRedirect,
    // loginWithPopup,
    // logout
    const auth0 = inject('Auth');
    console.log(auth0);
    const token = auth0.getTokenSilently();
    token.then((res) => console.log(res));

    console.log(token);
    return { token };
  }
};
</script>

<style></style>
