<script setup>
    import '../assets/login.css'
    import { useLoginLogic } from './login.js'
    const { username, password, formErrors, handleLogin } = useLoginLogic()
</script>

<template>
    <div class="form-body">
        <div class="form-container">
            <form class="recipe-form" @submit="handleLogin">
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

                <button type="submit" class="form-button">Login/Create</button>
            </form>
        </div>
    </div>
</template>