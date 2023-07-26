import { createRouter, createWebHistory } from 'vue-router'
import Single from "../views/Single.vue";
import Heroes from "../views/Heroes.vue";
import Initialize from "../views/Initialize.vue";


function keyInit(){
  return !!localStorage.DETA_API_KEY
}

export default createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: keyInit() ? Heroes : Initialize,
    
    },
    {
      path: "/h/:hero",
      name: "heroes",
      component: Single,
    },
  ],
});
