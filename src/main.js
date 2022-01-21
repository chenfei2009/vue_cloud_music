import Vue from 'vue'

import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
<<<<<<< HEAD
  Popover
=======
  Slider
>>>>>>> c328e313f635a0411e9df97f5b4e059ab27f3b87
} from 'element-ui'

import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '@/assets/css/global.css'
import '@/assets/css/font.css'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
<<<<<<< HEAD
Vue.use(Popover)
=======
Vue.use(Slider)
>>>>>>> c328e313f635a0411e9df97f5b4e059ab27f3b87

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
