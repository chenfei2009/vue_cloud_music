import Vue from 'vue'

import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Carousel,
  CarouselItem,
  Image,
  Tabs,
  TabPane,
  Tooltip,
  Pagination,
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Checkbox,
  Tag,
  ColorPicker,
  Loading
} from 'element-ui'

import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '@/assets/css/global.css'
import '@/assets/css/font.css'

// 引入vuex-store
import store from '@/store/index.js'

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(Tag)
Vue.use(ColorPicker)
Vue.use(Loading) // 使用服务方式的话，只安装Loading即可
Vue.use(Loading.directive) // 指令方式(v-loading)的话这两行都得有

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
