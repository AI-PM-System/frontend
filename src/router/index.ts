import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/projects/:id/manage',
      name: 'manage project',
      component: () => import('../views/ProjectManageView.vue')
    },
    {
      path: '/generate/project',
      name: 'generate project',
      component: () => import('../views/ProjectGeneratorView.vue')
    }
    /*
    {
      path: '/projects/:id',
      name: 'inspect project',
      component: () => import('../views/InspectProjectView.vue')
    },
    
    {
      path: '/generate/project',
      name: 'generate project',
      component: () => import('../views/GenerateProjectView.vue')
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/tasks/:id',
      name: 'inspect tasks',
      component: () => import('../views/InspectTasksView.vue')
    },*/
  ]
})

export default router
