<script setup>
    import '../assets/login.css'
    import { useLoginLogic } from './login.js'
    const { username, password, formErrors, errorMessage, handleLogin, handleRegister } = useLoginLogic()
</script>

<template>
    <div class="form-body">
        <div class="form-container">
            <form class="recipe-form">
                <div class="form-group">
                    <label class="form-label" for="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        class="form-input"
                        :class="{ 'input-error': !formErrors.username }"
                        v-model="username"
                    />
                </div>

                <div class="form-group">
                    <label class="form-label" for="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        class="form-input"
                        :class="{ 'input-error': !formErrors.password }"
                        v-model="password"
                    />
                </div>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                <div class="button-group">
                    <button type="button" class="form-button" @click="handleLogin">Login</button>
                    <button type="button" class="form-button" @click="handleRegister">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>