import { ref } from 'vue'

export function useDashboardStats() {
  const stats = ref([
    { title: 'Total Recipes', value: 120 },
    { title: 'Categories', value: 8 },
    { title: 'Users', value: 24 },
  ])

  // Optionally any other methods you might want to return too

  return { stats }
}

export function usePagination(totalPages = 5) {
    const currentPage = ref(1)
  
    function changePage(page) {
      currentPage.value = page
    }
  
    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }
  
    function nextPage() {
      if (currentPage.value < totalPages) {
        currentPage.value++
      }
    }
  
    return {
      currentPage,
      totalPages,
      changePage,
      prevPage,
      nextPage,
    }
  }