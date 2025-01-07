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

import {setColorScheme} from 'mdui/functions/setColorScheme.js';

// Generate a color scheme based on #0061a4 and set the <html> element to that color scheme
setColorScheme('#bb5ee6');

app.mount('#app');
