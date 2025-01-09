import '@/assets/css/main.css';
import 'beercss';
import 'material-dynamic-colors';
import dayjs from 'dayjs';

import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from '@/App.vue';
import router from '@/router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.config.globalProperties.$dayjs = dayjs;

app.mount('#app');
