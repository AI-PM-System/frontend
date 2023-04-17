import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueLocalStorage from 'vue-ls';

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(VueLocalStorage, {
    namespace: 'UniTaskPro_', // key prefix
    name: 'ls', // Name of the Vue.$ls property: this.$ls
    storage: 'local', // Storage name: session, local, memory
});

app.mount('#app')