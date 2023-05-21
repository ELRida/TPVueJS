import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'bootstrap/dist/css/bootstrap.css'

loadFonts()

const app = createApp(App)
    .use(vuetify)
    .mount('#app')

const pinia = createPinia();

app.use(pinia);
app.mount('#app');