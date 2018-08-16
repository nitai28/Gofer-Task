import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import router from './router'
import store from './store'
// import './styles/my-styles.scss'
import './registerServiceWorker'
import './css/bulma.css'
import './css/main.css'

Vue.use(VeeValidate);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')