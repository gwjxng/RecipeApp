<script setup>
    import '../assets/header.css'
</script>

<template>
  <header class="header">
    <h1 class="title">🍽️ My Recipe App</h1>
    <nav class="nav">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/recipes">Your Recipes</a>
    </nav>
    <user class="userdetails">
        <img src="../assets/images/login_icon.jpg" alt="Login Icon" class="login-icon" />
        <a href="/user">Login</a>
    </user>
  </header>
</template>