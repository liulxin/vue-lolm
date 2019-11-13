import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

const CategoryEdit = () => import('../views/CategoryEdit.vue')
const CategoryList = () => import('../views/CategoryList.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: 'categories/create',
        component: CategoryEdit
      },
      {
        path: 'categories/list',
        component: CategoryList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
