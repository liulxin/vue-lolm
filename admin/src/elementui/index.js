import {
  Button,
  Select,
  Option,
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
  TableColumn,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Upload,
  Rate,
  Tabs,
  TabPane,
  Row,
  Col
} from 'element-ui'

export default Vue => {
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Option)
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
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Upload)
  Vue.use(Rate)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Row)
  Vue.use(Col)

  Vue.prototype.$message = Message
  Vue.prototype.$confirm = MessageBox
}
