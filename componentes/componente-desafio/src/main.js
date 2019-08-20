import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

// Custom Components
import Menu   from './components/template/Menu.vue'
import Header from './components/template/Header.vue'
import Footer from './components/template/Footer.vue'
import Main   from './Main.vue'

Vue.config.productionTip = false

Vue.component('Menu', Menu);
Vue.component('Header', Header);
Vue.component('Footer', Footer);
Vue.component('Main', Main);

new Vue({
  render: h => h(App),
}).$mount('#app')
