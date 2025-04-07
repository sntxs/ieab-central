import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase/config'
import AdminLayout from '../layouts/AdminLayout.vue'

// Guard de rota para áreas protegidas
const requireAuth = (to, from, next) => {
  const user = auth.currentUser;
  if (!user) {
    next({ name: 'AdminLogin' });
  } else {
    next();
  }
};

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
  },
  // Rotas administrativas
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => import('../views/Admin/Login.vue')
      },
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('../views/Admin/Dashboard.vue'),
        beforeEnter: requireAuth,
        children: [
          {
            path: 'sobre',
            name: 'AdminSobre',
            component: () => import('../views/Admin/SobreAdmin.vue'),
            beforeEnter: requireAuth
          },
          {
            path: 'eventos',
            name: 'AdminEventos',
            component: () => import('../views/Admin/EventosAdmin.vue'),
            beforeEnter: requireAuth
          },
          {
            path: 'galeria',
            name: 'AdminGaleria',
            component: () => import('../views/Admin/GaleriaAdmin.vue'),
            beforeEnter: requireAuth
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 