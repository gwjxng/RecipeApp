<script setup>
    import '../assets/viewform.css';
    import { viewFormLogic } from './viewForm';

    const { recipeDetails,
        recipeIngredients,
    } = viewFormLogic()
</script>

<template>
    <div class="form-body">
        <div class="form-container">
           <h2 class="form-title">{{ recipeDetails.title }}</h2>
            <img v-if="recipeDetails.imageUrl" :src="recipeDetails.imageUrl" alt="Recipe Image" class="recipe-image" />
            <span  class="form-subtitle">( {{ recipeDetails.difficulty }} )</span>
            <div class="form-group">
                <label class="form-label" for="recipe-ingredients">Ingredients:</label>
                <div class="view-ingredients-container">
                    <div v-for="(ingredient, index) in recipeIngredients" :key="index" class="ingredient-item">
                        <span>{{ ingredient.ingredient_name }}</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label" for="recipe-description">Description:</label>
                <div class="view-ingredients-container">
                    <span> {{ recipeDetails.instructions }} </span>
                </div> 
            </div>
            <div class="button-container">
                <router-link to="/" class="back-button">Back</router-link>
            </div>
            <div class="creator-container">
                <span> Created By: {{ recipeDetails.creator_name }}</span>
                <span> Created On: {{ recipeDetails.created_date }} </span>
            </div>
            
        </div>    
    </div>
</template>