import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

const Login = () => import('../views/Login.vue')
const CategoryEdit = () => import('../views/CategoryEdit.vue')
const CategoryList = () => import('../views/CategoryList.vue')
const GoodsEdit = () => import('../views/GoodsEdit.vue')
const GoodsList = () => import('../views/GoodsList.vue')
const HerosEdit = () => import('../views/HerosEdit.vue')
const HerosList = () => import('../views/HerosList.vue')
const ArticlesEdit = () => import('../views/ArticlesEdit.vue')
const ArticlesList = () => import('../views/ArticlesList.vue')
const AdsEdit = () => import('../views/AdsEdit.vue')
const AdsList = () => import('../views/AdsList.vue')
const AdminUserEdit = () => import('../views/AdminUserEdit.vue')
const AdminUserList = () => import('../views/AdminUserList.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/categories/edit',
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
      },
      {
        path: 'heros/edit/:id',
        component: HerosEdit,
        props: true
      },
      {
        path: 'heros/edit',
        component: HerosEdit
      },
      {
        path: 'heros/list',
        component: HerosList
      },
      {
        path: 'articles/edit/:id',
        component: ArticlesEdit,
        props: true
      },
      {
        path: 'articles/edit',
        component: ArticlesEdit
      },
      {
        path: 'articles/list',
        component: ArticlesList
      },
      {
        path: 'ads/edit/:id',
        component: AdsEdit,
        props: true
      },
      {
        path: 'ads/edit',
        component: AdsEdit
      },
      {
        path: 'ads/list',
        component: AdsList
      },
      {
        path: 'admin_user/edit/:id',
        component: AdminUserEdit,
        props: true
      },
      {
        path: 'admin_user/edit',
        component: AdminUserEdit
      },
      {
        path: 'admin_user/list',
        component: AdminUserList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }

  next()
})

export default router
