import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from './config.js'
import { useAuthStore } from '../stores/authstore.js'
import { useRouter } from 'vue-router'

export function useLoginLogic() {
    const username = ref('')
    const password = ref('')

    const errorMessage = ref('')

    const formErrors = ref({
        username: true,
        password: true
    })

    const router = useRouter()
    const authStore = useAuthStore()

    function handleLogin(event) {
        event.preventDefault()

        formErrors.value.username = username.value.trim() !== ''
        formErrors.value.password = password.value.trim() !== ''
        errorMessage.value = ''
        
        if (formErrors.value.username && formErrors.value.password) {
            console.log('Form is valid, sending login request...')
            axios.post(`${API_BASE_URL}/accounts/login`, {
                username: username.value,
                password: password.value
            }).then(response => {
                console.log('Login response:', response.data)
                if (response.data === "false") {
                    errorMessage.value = 'No account found for that username.'
                } else if (response.data !== "wrong password") {
                    console.log('Login successful:', response.data)
                    authStore.login(username.value, response.data)
                    router.push('/')
                }
                else {
                    errorMessage.value = 'Incorrect password.'
                    formErrors.value.password = false
                    formErrors.value.username = false
                }
            }).catch(error => {
                console.error('Login error:')
                console.error('Login failed:', error.response.data)
            })
        } else {
            errorMessage.value = 'Please fill in all fields.'
        }
    }

    function handleRegister(event) {
        event.preventDefault()

        formErrors.value.username = username.value.trim() !== ''
        formErrors.value.password = password.value.trim() !== ''
        errorMessage.value = ''

        if (formErrors.value.username && formErrors.value.password) {
            console.log('Form is valid, sending registration request...')
            axios.post(`${API_BASE_URL}/accounts/register`, {
                username: username.value,
                password: password.value
            }).then(response => {
                    console.log('Registration successful:', response.data)
                    authStore.login(username.value, response.data.id)
                    router.push('/')
                }).catch(error => {
                    if (error.response?.data?.includes('constraint') || error.response?.data?.includes('unique')) {
                        errorMessage.value = 'Username is already taken.'
                  } else {
                        errorMessage.value = 'Registration failed. Please try again.'
                  }
           })
        } else {
            errorMessage.value = 'Please fill in all fields.'
        }
    }

    return {
        username,
        password,
        formErrors,
        errorMessage,
        handleLogin,
        handleRegister
    }
}