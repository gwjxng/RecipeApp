<script setup>
    import '../assets/dashboard.css'
    import { onMounted } from 'vue'
    import { useDashboardStats } from './dashboardLogic.js'

    const { stats } = useDashboardStats()

    onMounted(() => {
    console.log('Dashboard mounted with stats:', stats.value)
    })
</script>

<template>

    <h2>Recipes</h2>
    <div class="dashboard">
        <div class="dashboard-card" v-for="(item, index) in stats" :key="index">
            <h3>{{ item.title }}</h3>
            <p>{{ item.value }}</p>
        </div>
    </div>
</template>
