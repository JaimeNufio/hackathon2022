
import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import About from '@/components/About.vue'
import Browse from '@/components/Browse.vue'
import Survey from '@/components/Survey.vue'
import Checklist from '@/components/Checklist.vue'
import Explore from '@/components/Explore.vue'

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
    {path: '/survey',
      name: 'Survey',
      component: Survey
    },
    {path: '/checklist',
      name: 'Checklist',
      component: Checklist
    },
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/explore/:id',
      name: 'Explore',
      component: Explore
    }

  ]
})
