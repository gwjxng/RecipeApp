import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '../components/config.js'

export function useDashboardLogic(totalPages=5, emitPageChanged = null) {

    const recipes = ref([])

    axios.get(`${API_BASE_URL}/recipes`)
      .then(
        response => {recipes.value = response.data})
      .catch(error => {
        console.error('Error fetching recipes:', error)
      })
  
  const currentPage = ref(1)
  onMounted(() => {
    console.log('Dashboard loaded with recipes:', recipes)
  })

  return {
    recipes,
    currentPage,
    totalPages,
  }
}

