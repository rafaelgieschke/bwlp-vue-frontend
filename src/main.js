import '@/assets/css/main.css';
import 'mdui/mdui.css';
import 'mdui';
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
