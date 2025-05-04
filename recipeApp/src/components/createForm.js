import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from './config.js'
import { useAuthStore } from '../stores/authStore.js' 
import { useRouter } from 'vue-router'

export function useFormLogic() {
  const selectedDifficulty = ref('')
  const recipeTitle = ref('')
  const recipeDescription = ref('')
  const recipeIngredients = ref([]) 
  const newIngredient = ref('')
  const imageUrl = ref(null)
  const fileInput = ref(null)

  const authStore = useAuthStore()
  const router = useRouter()

  const formErrors = ref({
    title: true,
    description: true,
    ingredients: true,
    difficulty: true
  })

  function addIngredient() {
    if (newIngredient.value.trim() !== '') {
      recipeIngredients.value.push({ name: newIngredient.value.trim() })
      newIngredient.value = ''
    }
  }

  function removeIngredient(index) {
    recipeIngredients.value.splice(index, 1)
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

  function saveRecipe(recipeData) {
    return axios.post(`${API_BASE_URL}/recipes`, recipeData)
  }

  function saveIngredients(ingredientsData) {
    return axios.post(`${API_BASE_URL}/ingredients`, ingredientsData)
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

  function handleSave(event) {
    event.preventDefault()  

    if(!validateForm()) {
      console.log('Form is invalid. Please fill in all required fields.')
      console.log('Form Errors:', formErrors.value)
      return
    }
    

    const recipeData = {
      title: recipeTitle.value,
      instructions: recipeDescription.value,
      difficulty: selectedDifficulty.value,
      image_url: imageUrl.value,
      created_date : new Date().toISOString().split('T')[0],
      creator_name : authStore.getUsername,
      creator_id : authStore.getUserId
    }

    console.log('Recipe Data to Save:', recipeData)

    saveRecipe(recipeData)
      .then(response => {
        console.log('Recipe saved:', response.data)
        const recipeId = response.data.id

        const ingredientsData = recipeIngredients.value.map(ingredient => ({
          ingredient_name: ingredient.name,
          recipe_id: recipeId
        }))
  
        console.log('Recipe Data to Save:', ingredientsData)
  
        saveIngredients(ingredientsData)
        .then(() => {
          console.log('Ingredients saved!')
          clearForm()
          router.push('/')
        })
        .catch(error => {
          console.error('Error saving ingredients:', error)
        })

      })
      .catch(error => {
        console.error('Error saving recipe:', error)
      })
    
  
  }
  function clearForm() {
    recipeTitle.value = '';
    recipeDescription.value = '';
    recipeIngredients.value = [];
    recipeDescription.value = ''; 
    selectedDifficulty.value = '';
    imageUrl.value = null; 
    fileInput.value = null; 
    formErrors.value = {
      title: true,
      description: true,
      ingredients: true,
      difficulty: true
    }
  }
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
    handleSave,
  }
}


