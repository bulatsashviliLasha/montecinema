import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'RegistrationPageOne',
      component: () => import("../views/RegistrationPageOne.vue")
    },
    {
      path: '/second-step',
      name: 'RegistrationPageTwo',
      component: () => import('../views/RegistrationPageTwo.vue')
    },
    {
      path: '/registered',
      name: "registered",
      component: () => import('../views/Registered.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 };
  }
})

export default router
