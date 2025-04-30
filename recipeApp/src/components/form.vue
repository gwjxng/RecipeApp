<script setup>
    import '../assets/form.css';
    import { useFormLogic } from '../components/form.js';

    const { selectedDifficulty, imageUrl, fileInput, handleImageUpload, deleteImage } = useFormLogic();
</script>

<template>
    <div class="form-body">
        <div class="form-container">
            <h2 class="form-title">Create a New Recipe</h2>
            <form class="recipe-form">
                <div class="form-group">
                    <label for="recipe-name" class="form-label">Title:</label>
                    <input type="text" id="recipe-name" class="form-input" required />
                </div>
                <div class="form-group">
                    <label for="ingredients" class="form-label">Ingredients:</label>
                    <textarea id="ingredients" class="form-textarea" required></textarea>
                </div>
                <div class="form-group">    
                    <label for="instructions" class="form-label">Instructions:</label>
                    <textarea id="instructions" class="form-textarea" required></textarea>
                </div>    
                <div class="form-group">
                    <label for="difficulty" class="form-label">Difficulty:</label>

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