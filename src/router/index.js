import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Login from '../views/Login.vue';
import Activities from '../views/Activities.vue';
import CreateActivity from '../views/CreateActivity.vue';
import Redirect from '../views/Redirect.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/activities', name: 'Activities', component: Activities },
  { path: '/create-activity', name: 'CreateActivity', component: CreateActivity },
  { path: '/redirect', name: 'Redirect', component: Redirect },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.accessToken;

  if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Activities' });
  } else if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Redirect') {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
