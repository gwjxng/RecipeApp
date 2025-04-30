import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Webpages/Home.vue'
import CreateForm from '../Webpages/createRecipe.vue' // or wherever your form component lives

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/create-recipe', name: 'CreateForm', component: CreateForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
