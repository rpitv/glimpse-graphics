import { createApp } from 'vue';
import App from './slideshow/main.vue';
import {pinia} from "./pinia";
import vuetify from "../../plugins/vuetify";

const app = createApp(App);
app.use(pinia);
app.use(vuetify);
app.mount('#app');
