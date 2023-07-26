import { createRouter, createWebHistory } from 'vue-router'
import Single from "../views/Single.vue";
import Heroes from "../views/Heroes.vue";
import Initialize from "../views/Initialize.vue";
import About from "../views/About.vue";
import NotFound from "../views/NotFound.vue"

function keyInit(){
  return !!localStorage.DETA_API_KEY
}

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: keyInit() ? Heroes : Initialize,
    },
    {
      path: "/about/",
      name: "About",
      component: About,
    
    },
    { path: '/h',
     redirect: '/' 
    },
    {
      path: "/h/:hero",
      name: "Hero",
      component: Single,
    },
    { path: '/:pathMatch(.*)', component: NotFound }
  ],
});
