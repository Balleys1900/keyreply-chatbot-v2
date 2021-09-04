<template>
  <div class="about">
    <h1>This is an Auth page</h1>
    <div v-if="!loading">
      <!-- show login when not authenticated -->
      <button v-if="!isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-else @click="logout">Log out</button>

      <!-- <p>{{ typeof auth0.isAuthenticated }}</p> -->
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue';
export default {
  setup() {
    const auth0 = inject('Auth');

    const { isAuthenticated, loading } = auth0;

    const login = () => {
      auth0.loginWithRedirect();
    };

    // const isAuthenticated = computed(() => auth0.isAuthenticated);
    // console.log(isAuthenticated);
    // const loading = computed(() => auth0.loading);

    console.log({ a: isAuthenticated.value });

    const logout = () => {
      auth0.logout({
        returnTo: window.location.origin
      });
    };
    return { login, logout, isAuthenticated, loading };
  }
};
</script>
