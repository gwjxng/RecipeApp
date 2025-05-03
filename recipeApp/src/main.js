import { createApp } from 'vue'
import './assets/globalstyle.css'
import App from './Webpages/App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
