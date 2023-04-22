import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
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

    // Role
    {
      path: '/roles',
      name: 'inspect roles',
      component: () => import('../views/role/RoleCollectionView.vue')
    },
    {
      path: '/role/new',
      name: 'create role',
      component: () => import('../views/role/RoleCreateView.vue')
    },
    {
      path: '/role/:id/edit',
      name: 'edit role',
      component: () => import('../views/role/RoleEditView.vue')
    },

    // Member
    {
      path: '/members',
      name: 'inspect members',
      component: () => import('../views/member/MemberCollectionView.vue')
    },
    {
      path: '/member/new',
      name: 'create member',
      component: () => import('../views/member/MemberCreateView.vue')
    },
    {
      path: '/member/:id/edit',
      name: 'edit member',
      component: () => import('../views/member/MemberEditView.vue')
    },

    // Event
    {
      path: '/events',
      name: 'inspect events',
      component: () => import('../views/event/EventCollectionView.vue')
    },
    {
      path: '/event/new',
      name: 'create event',
      component: () => import('../views/event/EventCreateView.vue')
    },
    {
      path: '/event/:id/edit',
      name: 'edit event',
      component: () => import('../views/event/EventEditView.vue')
    },

    // Board
    {
      path: '/board/:id',
      name: 'inspect board',
      component: () => import('../views/board/BoardView.vue')
    },
    {
      path: '/boards',
      name: 'inspect boards',
      component: () => import('../views/board/BoardCollectionView.vue')
    },
    {
      path: '/board/new',
      name: 'create board',
      component: () => import('../views/board/BoardCreateView.vue')
    },
    {
      path: '/board/:id/edit',
      name: 'edit board',
      component: () => import('../views/board/BoardEditView.vue')
    },

    // Board List
    {
      path: '/board/:id/list/new',
      name: 'create board list',
      component: () => import('../views/boardList/BoardListCreateView.vue')
    },
    {
      path: '/board/:id/list/:listId/edit',
      name: 'edit board list',
      component: () => import('../views/boardList/BoardListEditView.vue')
    },

    // Task
    {
      path: '/board/:id/list/:listId/task/new',
      name: 'create task',
      component: () => import('../views/task/TaskCreateView.vue')
    },
    {
      path: '/board/:id/list/:listId/task/:taskId/edit',
      name: 'edit task',
      component: () => import('../views/task/TaskEditView.vue')
    },
  ]
})

export default router
