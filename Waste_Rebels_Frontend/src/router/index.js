import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import CollectionAdmin from '../pages/CollectionAdmin.vue';
import CollectionVolunteer from '../pages/CollectionVolunteer.vue';
import AddCollectionVolunteer from '../pages/AddCollectionVolunteer.vue';
import ViewCollectionAdmin from '../pages/ViewCollectionAdmin.vue';
import ViewCollectionVolunteer from '../pages/ViewCollectionVolunteer.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/admin/collection', component: CollectionAdmin },
  { path: '/volunteer/collection', component: CollectionVolunteer },
  { path: '/admin/collection/view', component: ViewCollectionAdmin },
  { path: '/volunteer/collection/add', component: AddCollectionVolunteer },
  { path: '/volunteer/collection/view', component: ViewCollectionVolunteer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;