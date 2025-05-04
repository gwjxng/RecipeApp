<script setup>
  import Header from '../components/Header.vue'
  import Dashboard from '../components/Dashboard.vue'
</script>

<template>
  <div id="home">
    <Header />
    <Dashboard />
    <router-view />
  </div>
</template>
