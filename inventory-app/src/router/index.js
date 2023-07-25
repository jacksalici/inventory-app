import { createRouter, createWebHistory } from 'vue-router'
import Inventory from "../components/Inventory.vue";
import Heroes from "../components/Heroes.vue";

export default createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: Heroes,
    },
    {
      path: "/:hero",
      name: "heroes",
      component: Inventory,
    },
  ],
});
