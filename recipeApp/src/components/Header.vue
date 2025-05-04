<script setup>
    import '../assets/header.css'
    import { useAuthStore } from '../stores/authStore.js'
    import { useRouter } from 'vue-router'

    const authStore = useAuthStore()
    const router = useRouter()

    function handleLogout() {
      authStore.logout()
      router.push('/')
    }

</script>

<template>
  <header class="header">
    <h1 class="title">🍽️ My Recipe App</h1>
    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link v-if="authStore.isAuthenticated" to="/your-recipes">Your Recipes</router-link>
    </nav>
    <user class="userdetails">
        <img src="../assets/images/login_icon.jpg" alt="Login Icon" class="login-icon" />
        <label v-if="authStore.isAuthenticated">{{ authStore.getUsername }}</label>

        <button v-if="authStore.isAuthenticated" class="logout-button" @click="handleLogout">
            Logout
        </button>
      <router-link v-else to="/user">Login</router-link>
    </user>
  </header>
</template>