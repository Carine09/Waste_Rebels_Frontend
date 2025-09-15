import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import CollectionAdmin from '../pages/CollectionAdmin.vue';
import CollectionVolunteer from '../pages/CollectionVolunteer.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/admin/collection', component: CollectionAdmin },
  { path: '/volunteer/collection', component: CollectionVolunteer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;