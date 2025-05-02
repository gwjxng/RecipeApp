import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from './config.js'
import { useRoute } from 'vue-router'

export function viewFormLogic() {
    const route = useRoute()
    const recipe_id = route.params.recipeId
    const recipeDetails = ref(null)
    const recipeIngredients = ref([])

    function fetchRecipeDetails() {
        console.log('Fetching recipe details for ID:', `${API_BASE_URL}/recipes/${recipe_id}`)
        return axios.get(`${API_BASE_URL}/recipes/${recipe_id}`)
            .then(response => {
                console.log('Recipe details:', response.data)
                recipeDetails.value = response.data
            })
            .catch(error => {
                console.error('Error fetching recipe details:', error)
            })
    }
    
    function fetchIngredients() {
        console.log('Fetching ingredients for recipe ID:', `${API_BASE_URL}/ingredients/${recipe_id}`)
        return axios.get(`${API_BASE_URL}/ingredients/${recipe_id}`)
            .then(response => {
                console.log('Ingredients:', response.data)
                recipeIngredients.value = response.data
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error)
            })
    }
    recipeDetails.value = fetchRecipeDetails()
    recipeIngredients.value = fetchIngredients()

    console.log('Recipe Details:', recipeDetails)
    return {
        recipeDetails,
        recipeIngredients,
    }
}
