import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import CompraVentaView from '@/views/CompraVentaView.vue'


const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView
  },
  {
    path: '/compraYventa',
    name: 'compraYventa',
    component: CompraVentaView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
