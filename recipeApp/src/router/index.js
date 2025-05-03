import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Webpages/Home.vue'
import CreateForm from '../Webpages/createRecipe.vue'
import ViewForm from '../Webpages/viewRecipe.vue'
import Login from '../Webpages/Login.vue'

const routes = [
  { path: '/', 
    name: 'Home', 
    component: Home 
  },
  { path: '/create-recipe', 
    name: 'CreateForm', 
    component: CreateForm 
  },
  {
    path: '/view-recipe/:recipeId',
    name: 'ViewForm',
    component: ViewForm,
    props: true
  },
  {
    path: '/user',
    name: 'Login',
    component: Login,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
