import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'bootstrap/dist/css/bootstrap.css'

loadFonts()

createApp(App)
    .use(vuetify)
    .mount('#app')

createApp(App)
    .user(createPinia())
    .mount('#app');