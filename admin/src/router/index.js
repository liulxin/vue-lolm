import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

const CategoryEdit = () => import('../views/CategoryEdit.vue')
const CategoryList = () => import('../views/CategoryList.vue')
const GoodsEdit = () => import('../views/GoodsEdit.vue')
const GoodsList = () => import('../views/GoodsList.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: 'categories/edit',
        component: CategoryEdit
      },
      {
        path: 'categories/edit/:id',
        component: CategoryEdit,
        props: true
      },
      {
        path: 'categories/list',
        component: CategoryList
      },
      {
        path: 'goods/edit/:id',
        component: GoodsEdit,
        props: true
      },
      {
        path: 'goods/edit',
        component: GoodsEdit
      },
      {
        path: 'goods/list',
        component: GoodsList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
