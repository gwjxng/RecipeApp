<script setup>
  import Header from './components/Header.vue'
  import Body from './components/Body.vue'
  import Dashboard from './components/Dashboard.vue'
</script>

<template>
  <div id="app">
    <Header />
    <Body />
    <Dashboard />
    <router-view />
  </div>
</template>

<style scoped>
</style>
