import { ref, onMounted } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from './config.js'
import { useRoute, useRouter } from 'vue-router'

export function editFormLogic() {
  const route = useRoute()
  const router = useRouter()
  const recipeId = route.params.recipeId

  const selectedDifficulty = ref('')
  const recipeTitle = ref('')
  const recipeDescription = ref('')
  const recipeIngredients = ref([])
  const newIngredient = ref('')
  const imageUrl = ref(null)
  const fileInput = ref(null)

  const formErrors = ref({
    title: true,
    description: true,
    ingredients: true,
    difficulty: true
  })

  function addIngredient() {
    if (newIngredient.value.trim() !== '') {
      recipeIngredients.value.push({ name: newIngredient.value.trim(), id: null })
      newIngredient.value = ''
    }
  }

  function removeIngredient(index) {
    const ingredient = recipeIngredients.value[index]
    if (ingredient.id) {
      axios.delete(`${API_BASE_URL}/ingredients/${ingredient.id}`)
        .then(() => {
          recipeIngredients.value.splice(index, 1)
        })
        .catch(err => console.error('Failed to delete ingredient:', err))
    } else {
      recipeIngredients.value.splice(index, 1)
    }
  }

  function handleImageUpload(event) {
    const file = event.target.files[0]
    if (file) {
      imageUrl.value = URL.createObjectURL(file)
    }
  }

  function deleteImage() {
    imageUrl.value = null
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }

  function fetchRecipe() {
    axios.get(`${API_BASE_URL}/recipes/${recipeId}`)
      .then(response => {
        const recipe = response.data
        recipeTitle.value = recipe.title
        recipeDescription.value = recipe.instructions
        selectedDifficulty.value = recipe.difficulty
        imageUrl.value = recipe.image_url
      })
      .catch(error => {
        console.error('Error fetching recipe:', error)
      })
  }

  function fetchIngredients() {
    axios.get(`${API_BASE_URL}/ingredients/${recipeId}`)
      .then(response => {
        recipeIngredients.value = response.data.map(ing => ({
          id: ing.id,
          name: ing.ingredient_name
        }))
      })
      .catch(error => {
        console.error('Error fetching ingredients:', error)
      })
  }

  function validateForm() {
    formErrors.value = {
      title: true,
      description: true,
      ingredients: true,
      difficulty: true
    }

    let isValid = true

    if (!recipeTitle.value.trim()) {
      formErrors.value.title = false
      isValid = false
    }

    if (!recipeDescription.value.trim()) {
      formErrors.value.description = false
      isValid = false
    }

    if (recipeIngredients.value.length === 0) {
      formErrors.value.ingredients = false
      isValid = false
    }

    if (!selectedDifficulty.value) {
      formErrors.value.difficulty = false
      isValid = false
    }

    return isValid
  }

  function handleUpdate(event) {
    event.preventDefault()

    if (!validateForm()) {
      console.log('Form is invalid.', formErrors.value)
      return
    }

    const updatedData = {
      title: recipeTitle.value,
      instructions: recipeDescription.value,
      difficulty: selectedDifficulty.value,
      image_url: imageUrl.value
    }

    axios.put(`${API_BASE_URL}/recipes/${recipeId}`, updatedData)
      .then(() => {
        console.log('Recipe updated.')

        recipeIngredients.value.forEach(ingredient => {
            if (ingredient.id) {
              axios.put(`${API_BASE_URL}/ingredients/${ingredient.id}`, {
                ingredient_name: ingredient.name,
                recipe_id: recipeId
              })
            } else {
                axios.post(`${API_BASE_URL}/ingredients`, [
                    {
                      ingredient_name: ingredient.name,
                      recipe_id: Number(recipeId)
                    }
                  ])      
            }
          })
          

        router.push('/your-recipes')
      })
      .catch(error => {
        console.error('Error updating recipe:', error)
      })
  }

  onMounted(() => {
    fetchRecipe()
    fetchIngredients()
  })

  return {
    selectedDifficulty,
    recipeTitle,
    recipeDescription,
    recipeIngredients,
    imageUrl,
    fileInput,
    newIngredient,
    formErrors,
    addIngredient,
    removeIngredient,
    handleImageUpload,
    deleteImage,
    handleUpdate
  }
}
