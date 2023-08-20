import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

const app = createApp(App)

app.use(router)

app.mount('#app')
