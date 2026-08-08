import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  { path: '/', redirect: '/en' },
  { path: '/en', component: Home, props: { locale: 'en' } },
  { path: '/mk', component: Home, props: { locale: 'mk' } },
  { path: '/:pathMatch(.*)*', redirect: '/en' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
