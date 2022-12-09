<template>
  <div v-if="$route.path == '/'">
    <Portfolio />
  </div>
  <div v-else-if="($route.path == '/login' && !$store.state.isAuth)">
    <Login />
  </div>
  <div v-else-if="($route.path == '/dashboard' && $store.state.isAuth)">
    <Dashboard />
  </div>
  <div v-else>
    <NotFound />
  </div>
</template>

<script>
import Login from './router/routes/Login.vue';
import Portfolio from './router/routes/Portfolio.vue'
import NotFound from './router/routes/NotFound.vue'
import Dashboard from './router/routes/Dashboard.vue'

import './assets/js/scripts';

export default {
  name: 'App',
  components: {
    Portfolio,
    Login,
    NotFound,
    Dashboard
  }
}
</script>

<style>

</style>
