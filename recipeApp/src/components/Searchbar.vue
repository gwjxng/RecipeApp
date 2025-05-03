<script setup>
  import '../assets/searchbar.css'
  import { useDashboardLogic } from './dashboardLogic.js'

  const { fetchRecipes } = useDashboardLogic()
</script>

<template>
  <body class="body">
    <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search recipes..."
      class="search-input"
    />
    <button class="search-button" @click="fetchRecipes(searchQuery)">
        <img src="../assets/images/search_icon.png" class="search-icon" />
    </button>
    <filter class="filter-button" @click="performFilter">
        <img src="../assets/images/filter_icon.png" class="filter-icon" />
    </filter>
  </div>
  </body>
</template>