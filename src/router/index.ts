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

    // Authentication
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/authentication/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/authentication/SignupView.vue')
    },

    // Chat
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('../views/chat/ChatView.vue')
    },

    // Project
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/project/ProjectCollectionView.vue')
    },
    {
      path: '/project/:id/manage',
      name: 'manage project',
      component: () => import('../views/project/ProjectManageView.vue')
    },
    {
      path: '/generate/project',
      name: 'generate project',
      component: () => import('../views/project/ProjectGeneratorView.vue')
    },

    // Task
    {
      path: '/task/:id',
      name: 'inspect task',
      component: () => import('../views/task/TaskView.vue')
    },
    {
      path: '/tasks',
      name: 'inspect tasks',
      component: () => import('../views/task/TaskCollectionView.vue')
    },

    // Role
    {
      path: '/role/:id',
      name: 'inspect role',
      component: () => import('../views/role/RoleView.vue')
    },
    {
      path: '/roles',
      name: 'inspect roles',
      component: () => import('../views/role/RoleCollectionView.vue')
    },

    // Member
    {
      path: '/member/:id',
      name: 'inspect member',
      component: () => import('../views/member/MemberView.vue')
    },
    {
      path: '/members',
      name: 'inspect members',
      component: () => import('../views/member/MemberCollectionView.vue')
    },

    // Event
    {
      path: '/event/:id',
      name: 'inspect event',
      component: () => import('../views/event/EventView.vue')
    },
    {
      path: '/events',
      name: 'inspect events',
      component: () => import('../views/event/EventCollectionView.vue')
    },
  ]
})

export default router
