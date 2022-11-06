
import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/Homepage";
import About from "@/components/About.vue";
import Browse from '@/components/Browse.vue'
import Checklist from '@/components/Checklist.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/about',
      name: 'About',
      component: About
    },
    {path: '/browse',
      name: 'Browse',
      component: Browse
    },
    {
      path: "/",
      name: "Homepage",
      component: Homepage
    },
    {
      path: '/checklist',
      name: "Checklist",
      component: Checklist
    }

  ]
})
