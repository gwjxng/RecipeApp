<script setup>
    import { ref } from 'vue'
    import '../assets/dashboard.css'
    import { useDashboardLogic, toggleFilterLogic } from './dashboardLogic.js'
    import { useAuthStore } from '../stores/authstore.js'
    import { useRoute } from 'vue-router'

    const authStore = useAuthStore()
    const route = useRoute()

    const { recipes, currentPage, totalPages, displayedRecipes, fetchRecipes, nextPage, prevPage } = useDashboardLogic(authStore.getUserId)
    const { filterVisible, triggerFilterDropdown } = toggleFilterLogic()

    const selectedDifficulty = ref('')
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
            <button class="search-button" @click="fetchRecipes(searchQuery, selectedDifficulty, ingredientCount)">
                <img src="../assets/images/search_icon.png" class="search-icon" />
            </button>
            <img v-if="route.path !== '/your-recipes' "src="../assets/images/filter_icon.png" class="filter-icon" @click="triggerFilterDropdown()"/>
        </div>
    </body>

    <div v-if="filterVisible" class="filter-container">
        <div>
            <div class="filter-options">
                <label class="filter-label" for="difficulty">Difficulty:</label>
                <select class="difficulty-select" id="difficulty" v-model="selectedDifficulty">
                    <option value="">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <div class="filter-options">
                <label class="filter-label" for="sort">No. of Ingredients:</label>
                <input type="text" class="count-input" v-model="ingredientCount"/>
            </div>  
        </div>
        <div class="filter-options" >
            <button class="filter-button" @click="fetchRecipes(searchQuery, selectedDifficulty, ingredientCount)">Apply Filters</button>
            <button class="filter-button" @click="triggerFilterDropdown()">Close</button>
        </div>

    </div>

    <div v-if="authStore.isAuthenticated" class="create-recipe">
        <router-link to="/create-recipe" class="create-recipe-button">Create Recipe</router-link>
    </div>
    <h2>Recipes</h2>
    <div class="dashboard">
        <div class="dashboard-card" v-for="(item, index) in displayedRecipes" 
        :key="index"
        :style="item.image_url ? { backgroundImage: 'url(' + item.image_url + ')', backgroundSize: 'cover', backgroundPosition: 'center' } : {}">
            <router-link :to="{
                name: route.path.includes('/your-recipes') ? 'EditForm' : 'ViewForm',
                params: { recipeId: item.id }
            }" class="card-content">
                <p>{{ item.title }}</p>
                <h3>{{ item.creator_name }}</h3>
                <h3> {{ item.created_date }}   </h3>
            </router-link>
        </div>
    </div>

    <div class="page">
        <button class="page-button" @click="prevPage" :disabled="currentPage <= 1">Previous</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button class="page-button" @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
    </div>
</template>
