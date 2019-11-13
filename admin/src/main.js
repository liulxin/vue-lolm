import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  Select,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Main,
  Table,
  TableColumn
} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Header)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Main)
Vue.use(Table)
Vue.use(TableColumn)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
