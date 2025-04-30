import { createApp } from 'vue'
import './assets/globalstyle.css'
import App from './Webpages/App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
