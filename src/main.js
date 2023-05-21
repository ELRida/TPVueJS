import { createApp } from 'vue'
import store from './app/stores/pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'bootstrap/dist/css/bootstrap.css'

loadFonts()

const app = createApp(App)

app.use(vuetify)
    .use(store)
    .mount('#app');