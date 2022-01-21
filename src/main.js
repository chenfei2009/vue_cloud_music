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
<<<<<<< HEAD
  Popover
=======
  Slider
>>>>>>> c328e313f635a0411e9df97f5b4e059ab27f3b87
=======
  Popover
>>>>>>> 26079ebd076347dca3a5d55cd9a77edb1ed0794e
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
<<<<<<< HEAD
Vue.use(Popover)
=======
Vue.use(Slider)
>>>>>>> c328e313f635a0411e9df97f5b4e059ab27f3b87
=======
Vue.use(Popover)
>>>>>>> 26079ebd076347dca3a5d55cd9a77edb1ed0794e

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
