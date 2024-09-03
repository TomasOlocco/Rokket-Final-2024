import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import CompraVentaView from '@/views/CompraVentaView.vue'
import HistorialView from '@/views/HistorialView.vue'
import AnalisisView from '@/views/AnalisisView.vue'

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
  },
  {
    path: '/historial',
    name: 'historial',
    component: HistorialView
  },
  {
    path:'/analisisInversiones',
    name: 'analisisInversiones',
    component: AnalisisView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
