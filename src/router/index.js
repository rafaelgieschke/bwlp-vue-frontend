import {createRouter, createWebHistory} from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ListView from '@/views/ListView.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/list',
    name: 'List',
    component: ListView,
    meta: {requiresAuth: true},
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('authToken');

  if (to.meta.requiresAuth) {
    if (!authToken) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
