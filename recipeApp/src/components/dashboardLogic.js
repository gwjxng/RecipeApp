import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '../components/config.js'
import { useRoute } from 'vue-router'
import '../assets/searchbar.css'

export const filterVisible = ref(false)
export const searchQuery = ref('')
export const selectedDifficulty = ref('')
export const ingredientCount = ref('')

export function useDashboardLogic(creator_id = null) {
  const totalPages = ref(1)  // We start with 1 page, it will be updated after fetching data
  const recipes = ref([])
  const currentPage = ref(1)
  const route = useRoute()
  const recipesPerPage = 3 // Display 3 recipes per page

  function fetchRecipes(searchQuery, selectedDifficulty, ingredientCount) {
    let url = `${API_BASE_URL}/recipes`
    if (route.path === '/your-recipes') {
      url = `${API_BASE_URL}/recipes/your-recipes/${creator_id}`
    }
    if (searchQuery && selectedDifficulty) {
      url += `?query=${searchQuery}&difficulty=${selectedDifficulty}`
    } else if (searchQuery) {
      url += `?query=${searchQuery}`
    } else if (selectedDifficulty) {
      url += `?difficulty=${selectedDifficulty}`
    }

    console.log('Fetching recipes from:', url)
    axios.get(url)
      .then(async response => {
        let fetchedRecipes = response.data

        // Filter by ingredient count if specified
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
          fetchedRecipes = filteredByIngredients.filter(r => r !== null)
        }

        recipes.value = fetchedRecipes

        // Calculate total pages based on the recipes fetched and the number of recipes per page
        totalPages.value = Math.ceil(fetchedRecipes.length / recipesPerPage)
      })
      .catch(error => {
        console.error('Error fetching recipes:', error)
      })
  }

  // Computed property to get recipes for the current page
  const displayedRecipes = computed(() => {
    const start = (currentPage.value - 1) * recipesPerPage
    const end = start + recipesPerPage
    return recipes.value.slice(start, end)
  })

  // Handle the "Next" button click
  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  // Handle the "Previous" button click
  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  onMounted(() => {
    fetchRecipes(searchQuery.value, selectedDifficulty.value, ingredientCount.value)
  })

  return {
    recipes,
    currentPage,
    totalPages,
    displayedRecipes,
    fetchRecipes,
    nextPage,
    prevPage
  }
}

export function toggleFilterLogic() {
  function triggerFilterDropdown() {
    filterVisible.value = !filterVisible.value
  }

  return {
    filterVisible, 
    triggerFilterDropdown
  }
}
