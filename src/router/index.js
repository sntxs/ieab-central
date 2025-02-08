import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: () => import('../views/Sobre.vue')
  },
  {
    path: '/eventos',
    name: 'Eventos',
    component: () => import('../views/Eventos.vue')
  },
  {
    path: '/galeria',
    name: 'Galeria',
    component: () => import('../views/Galeria.vue')
  },
  {
    path: '/localizacao',
    name: 'Localizacao',
    component: () => import('../views/Localizacao.vue')
  },
  {
    path: '/contato',
    name: 'Contato',
    component: () => import('../views/Contato.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 