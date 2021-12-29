import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import FontAwesomeIcon from './config/FontsAwesome'

createApp(App).component('ic', FontAwesomeIcon).use(router).mount('#app')
