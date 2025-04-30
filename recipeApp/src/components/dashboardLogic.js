import { ref, onMounted, watch } from 'vue'

export function useDashboardLogic(totalPages = 5, emitPageChanged = null) {

  const stats = ref([
    { title: 'Total Recipes', value: 120 },
    { title: 'Categories', value: 8 },
    { title: 'Users', value: 24 },
  ])
  
  const currentPage = ref(1)
  onMounted(() => {
    console.log('Dashboard loaded with stats:', stats.value)
  })

  return {
    stats,
    currentPage,
    totalPages,
  }
}
