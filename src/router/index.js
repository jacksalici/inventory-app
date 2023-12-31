import { createRouter, createWebHistory } from 'vue-router'
import Single from "../views/Single.vue";
import Heroes from "../views/Heroes.vue";
import Initialize from "../views/Initialize.vue";
import About from "../views/About.vue";
import NotFound from "../views/NotFound.vue"
import Settings from "../views/Settings.vue"


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
      props: true
    },
    {
      path: "/about/",
      name: "About",
      component: About,
    
    },
    {
      path: "/settings/",
      name: "Settings",
      component: Settings,
    
    },
    { path: '/h',
     redirect: '/' 
    },
    {
      path: "/h/:hero",
      name: "Hero",
      component: Single,
      props: true
      
    },
    { path: '/:pathMatch(.*)', component: NotFound }
  ],
});
