import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import store from '../store/index.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/Inspections/assigned',
    name: 'assigned',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "assigned" */ '../views/Inspections/AssignedView.vue')
  },
  {
    path: '/Inspections/completed',
    name: 'completed',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "completed" */ '../views/Inspections/CompletedView.vue')
  },
  {
    path: '/knowledge_base',
    name: 'knowledge_base',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "knowledge_base" */ '../views/KnowledgeBaseView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    alias: ['/inspections/settings', '/Details/settings'],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "settings" */ '../views/SettingsView.vue')
  },
  {
    path: '/Details/DamageDetail',
    name: 'damagedetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "damagedetail" */ '../views/Details/DamageDetail.vue'),
    props: true
  },
  {
    path: '/Details/MaintenanceDetail',
    name: 'maintenancedetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "maintenancedetail" */ '../views/Details/MaintenanceDetail.vue'),
    props: true
  },
  {
    path: '/Details/InstallationDetail',
    name: 'installationdetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "installationdetail" */ '../views/Details/InstallationDetail.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.state.isAuthenticated)
    next({ name: 'login' })
  else next()
})

export default router
