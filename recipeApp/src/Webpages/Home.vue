<script setup>
  import Header from '../components/Header.vue'
  import Searchbar from '../components/Searchbar.vue'
  import Dashboard from '../components/Dashboard.vue'
</script>

<template>
  <div id="home">
    <Header />
    <Searchbar />
    <Dashboard />
    <router-view />
  </div>
</template>

<style scoped>
</style>
