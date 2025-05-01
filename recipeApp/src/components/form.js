import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '../components/config.js'

export function useFormLogic() {
  // form state
  const selectedDifficulty = ref('')
  const recipeTitle = ref('')
  const recipeDescription = ref('')
  const recipeIngredients = ref('')
  const imageUrl = ref(null)
  const fileInput = ref(null)

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

  function handleSave(event) {
    event.preventDefault()  
    const recipeData = {
      title: recipeTitle.value,
      instructions: recipeDescription.value,
      difficulty: selectedDifficulty.value,
      image_url: imageUrl.value,
      created_date : new Date().toISOString().split('T')[0],
      creator_name : 'Johnny Bravo',
    }

    //testing the data before sending it to the server
    console.log('Recipe Data to Save:', recipeData)

    saveRecipe(recipeData)
      .then(response => {
        console.log('Recipe saved:', response.data)
        clearForm()
      })
      .catch(error => {
        console.error('Error saving recipe:', error)
      })
    
    const ingredientsData = {
        ingredients: recipeIngredients.value.split('\n').map(ingredient => ingredient.trim())
      }
  }
  function clearForm() {
    recipeTitle.value = '';
    recipeDescription.value = '';
    recipeIngredients.value = '';
    recipeDescription.value = ''; 
    selectedDifficulty.value = '';
    imageUrl.value = null; 
    fileInput.value = null; 
  }
  return {
    selectedDifficulty,
    recipeTitle,
    recipeDescription,
    recipeIngredients,
    imageUrl,
    fileInput,
    handleImageUpload,
    deleteImage,
    handleSave
  }
}


