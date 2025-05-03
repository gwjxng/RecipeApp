import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '../components/config.js'
import '../assets/searchbar.css'

export const filterVisible = ref(false)
export const searchQuery = ref('')
export const selectedDifficulty = ref('')
export const ingredientCount = ref('')

export function useDashboardLogic(totalPages=5, emitPageChanged = null) {

    const recipes = ref([])
    function fetchRecipes(searchQuery, selectedDifficulty, ingredientCount) {
      let url = `${API_BASE_URL}/recipes`

      if (searchQuery && selectedDifficulty) {
        url += `?query=${searchQuery}&difficulty=${selectedDifficulty}`
      }

      else if (searchQuery) {
        url += `?query=${searchQuery}`
      }
      else if (selectedDifficulty) {
        url += `?difficulty=${selectedDifficulty}`
      }
      console.log('Fetching recipes from:', url)
      axios.get(url)
        .then(async response => {
          let fetchedRecipes = response.data

          if (ingredientCount) {
            const filteredByIngredients = await Promise.all(
              fetchedRecipes.map(async (recipe) => {
                const res = await axios.get(`${API_BASE_URL}/ingredients/${recipe.id}`)
                if (res.data.length == ingredientCount) {
                  return recipe
                }
                return null
              })
            )
    
            // Filter out nulls
            recipes.value = filteredByIngredients.filter(r => r !== null)
          } else {
            recipes.value = fetchedRecipes
          }
          })
        .catch(error => {
          console.error('Error fetching recipes:', error)
        })
    }
  
  const currentPage = ref(1)
  onMounted(() => {
    fetchRecipes()
  })

  return {
    recipes,
    currentPage,
    totalPages,
    fetchRecipes
  }
}

export function toggleFilterLogic(){
 
  function triggerFilterDropdown() {
    filterVisible.value = !filterVisible.value
  }

  return {
    filterVisible, 
    triggerFilterDropdown
  }
}