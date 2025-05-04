<script setup>
    import '../assets/createform.css';
    import { editFormLogic } from './editForm.js';

    const { 
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
    } = editFormLogic()
</script>

<template>
    <div class="form-body">
        <div class="form-container">
            <h2 class="form-title">Create a New Recipe</h2>
            <form class="recipe-form" @submit="handleUpdate">
                <div class="form-group">
                    <div display="block" class="form-label">
                        <label for="recipe-name">Title:</label>   
                        <p v-if="!formErrors.title" class="error-message">Please include a recipe title</p>
                    </div>                   
                    <input 
                        type="text" 
                        id="recipe-name" 
                        class="form-input" 
                        :class="{ 'input-error': !formErrors.title }" 
                        v-model="recipeTitle"
                        />
                </div>
                <div class="form-group">
                    <div display="block" class="form-label">
                        <label for="ingredients">Ingredients:</label>  
                        <p v-if="!formErrors.ingredients" class="error-message">Please include at least 1 ingredient</p>
                    </div> 
                    
                    <div class="ingredients-container">
                        <div v-for="(ingredient, index) in recipeIngredients" :key="index" class="ingredient-item">
                            <span>{{ ingredient.name }}</span>
                            <button type="button" class ="ingredient-button" @click="removeIngredient(index)">X</button>
                        </div>
                        <div class="add-ingredients-container">
                            <input
                                type="text"
                                v-model="newIngredient"
                                placeholder="Add ingredient"
                                class = "ingredient-input"
                                :class="{ 'input-error': !formErrors.ingredients }" 
                            />
                            <button type="button" class ="ingredient-button" @click="addIngredient">Add</button>
                        </div>
                    </div>
                </div>
                <div class="form-group">    
                    <div display="block" class="form-label">
                        <label for="instructions">Instructions:</label>
                        <p v-if="!formErrors.description" class="error-message">Please include at least 1 instruction</p>
                    </div> 
                    <textarea id="instructions" class="form-textarea" :class="{ 'input-error': !formErrors.description }" v-model="recipeDescription"></textarea>
                </div>    
                <div class="form-group">
                    <div display="block" class="form-label">
                        <label for="difficulty">Difficulty:</label>
                        <p v-if="!formErrors.difficulty" class="error-message">Please select a difficulty</p>
                    </div>

                    <div class="radio-group">
                        <label class="radio-text">
                        <input type="radio" value="Easy" v-model="selectedDifficulty" /> Easy
                        </label>
                        <label class="radio-text">
                        <input type="radio" value="Medium" v-model="selectedDifficulty" /> Medium
                        </label>
                        <label class="radio-text">
                        <input type="radio" value="Hard" v-model="selectedDifficulty" /> Hard
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="image" class="form-label">Upload Image:</label>
                    <input
                        type="file"
                        id="imageUpload"
                        @change="handleImageUpload"
                        accept="image/*"
                        v-show="!imageUrl"
                        ref="fileInput"
                        />

                    <div v-if="imageUrl" class="image-preview">
                        <img :src="imageUrl" alt="Uploaded Preview" />
                        <button @click="deleteImage" class="delete-button">Delete Image</button>
                    </div>
                </div>
                <button type="submit" class="form-button">Save</button>
            </form>
        </div>    
    </div>
</template>