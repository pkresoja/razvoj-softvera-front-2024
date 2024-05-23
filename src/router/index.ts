import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import FlightView from '@/views/FlightView.vue'
import TicketView from '@/views/TicketView.vue'
import BookView from '@/views/BookView.vue'
import CodeView from '@/views/CodeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About'
      }
    },
    {
      path: '/flight/:id/book',
      name: 'book',
      component: BookView,
      meta: {
        title: 'Book a ticket'
      }
    },
    {
      path: '/flight/:id',
      name: 'flight',
      component: FlightView,
      meta: {
        title: 'Details'
      }
    },
    {
      path: '/code/:id',
      name: 'code',
      component: CodeView,
      meta: {
        title: 'Ticket'
      }
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: TicketView,
      meta: {
        title: 'Ticket List'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Register'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title)
      document.title = `${to.meta.title} :: TicketBrowse`;
  next();
})

export default router
