import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import FlightView from '@/views/FlightView.vue'
import TicketView from '@/views/TicketView.vue'
import BookView from '@/views/BookView.vue'
import CodeView from '@/views/CodeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/flight/:id/book',
      name: 'book',
      component: BookView
    },
    {
      path: '/flight/:id',
      name: 'flight',
      component: FlightView
    },
    {
      path: '/code/:id',
      name: 'code',
      component: CodeView
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: TicketView
    },
  ]
})

export default router
