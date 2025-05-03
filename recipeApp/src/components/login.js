import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from './config.js'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

export function useLoginLogic() {
    const username = ref('')
    const password = ref('')

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
        
        if (formErrors.value.username && formErrors.value.password) {
            console.log('Form is valid, sending login request...')
            axios.post(`${API_BASE_URL}/accounts/login`, {
                username: username.value,
                password: password.value
            }).then(response => {
                console.log('Login response:', response.data)
                if (response.data === false) {
                    axios.post(`${API_BASE_URL}/accounts/register`, {
                        username: username.value,
                        password: password.value
                    }).then(response => {
                        console.log('Registration successful:', response.data)
                        authStore.login(username.value, response.data.id)
                        router.push('/')
                        }).catch(error => {
                        console.error('Registration failed:', error.response.data)
                   })
                } else {
                    console.log('Login successful:', response.data)
                    authStore.login(username.value, response.data)
                    router.push('/')
                }
            }).catch(error => {
                console.error('Login error:')
                console.error('Login failed:', error.response.data)
                // Handle login failure (e.g., show error message)
            })
        } else {
        console.log('Validation failed')
        }
    }

    return {
        username,
        password,
        formErrors,
        handleLogin
    }
}