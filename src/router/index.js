import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Disponibilite from "../components/Disponibilite";
import Container from "../components/Container";
import AjoutCreneau from "../components/AjoutCreneau";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dispo',
    name: 'dispo',
    component: Disponibilite
  },
  {
    path: '/container',
    name: 'container',
    component: Container
  },
  {
    path: '/create',
    name: 'Create',
    component: AjoutCreneau
  }
];

const router = new VueRouter({
  routes
});

export default router
