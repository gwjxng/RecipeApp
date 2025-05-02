<script setup>
    import '../assets/dashboard.css'
    import { useDashboardLogic } from './dashboardLogic.js'

    const { recipes, currentPage, totalPages } = useDashboardLogic()
</script>

<template>
    <div class="create-recipe">
        <router-link to="/create-recipe" class="create-recipe-button">Create Recipe</router-link>
    </div>
    <h2>Recipes</h2>
    <div class="dashboard">
        <div class="dashboard-card" v-for="(item, index) in recipes" 
        :key="index"
        :style="item.image_url ? { backgroundImage: 'url(' + item.image_url + ')', backgroundSize: 'cover', backgroundPosition: 'center' } : {}">
            <router-link :to="{ name: 'ViewForm', params: { recipeId: item.id } }" class="card-content">
                <p>{{ item.title }}</p>
                <h3>{{ item.creator_name }}</h3>
                <h3> {{ item.created_date }}   </h3>
            </router-link>
        </div>
    </div>
    <div class = "page">
        <button class="page-button" @click="prevPage">Previous</button>
        <h3 class="page-number">{{ currentPage }} / {{ totalPages }}</h3>
        <button class="page-button" @click="nextPage">Next</button>
    </div>
</template>
