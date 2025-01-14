<template>
  <header>
    <nav>
      <MobileNavigation />
      <h5 class="l max center-align">Baden-Württemberg Lehrpool</h5>
      <div class="m max center-align"></div>
      <h5 class="s max center-align">BW Lehrpool</h5>
      <!-- <button data-ui="#theme-dialog" class="circle transparent">
        <i>palette</i>
      </button> -->
      <button @click="mode()" class="m l chip circle small">
        <i>light_mode</i>
      </button>
      <button class="m l">
        Menu
        <i>arrow_drop_down</i>
        <menu>
          <a>Profile</a>
          <a v-if="authStore.authToken" href="#" @click.prevent="logout">
            Logout
          </a>
        </menu>
      </button>
    </nav>
  </header>

  <!-- <dialog id="theme-dialog" class="medium right">
    <h5>Themes</h5>
    <div>
      <div>
        <nav class="wrap">
          <button @click="mode()" class="chip circle small">
            <i>light_mode</i>
          </button>
          <button class="chip circle">
            <i>palette</i>
            <input type="color" />
          </button>
          <button class="chip circle">
            <i>upload</i>
            <input type="file" />
          </button>
          <button class="circle small red"></button>
          <button class="circle small pink"></button>
          <button class="circle small purple"></button>
          <button class="circle small deep-purple"></button>
          <button class="circle small indigo"></button>
          <button class="circle small blue"></button>
          <button class="circle small light-blue"></button>
          <button class="circle small cyan"></button>
          <button class="circle small teal"></button>
          <button class="circle small green"></button>
          <button class="circle small light-green"></button>
          <button class="circle small lime"></button>
          <button class="circle small yellow"></button>
          <button class="circle small amber"></button>
          <button class="circle small orange"></button>
          <button class="circle small deep-orange"></button>
          <button class="circle small brown"></button>
          <button class="circle small grey"></button>
          <button class="circle small blue-grey"></button>
          <button class="circle small black"></button>
          <button class="circle small white"></button>
        </nav>
      </div>
    </div>
  </dialog> -->
</template>

<script setup>
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import MobileNavigation from '@/components/navigation/MobileNavigation.vue';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.clearToken();
  router.push('/login');
};

// const theme = async from => {
//   await ui('theme', from);
// };

const mode = () => {
  let newMode = ui('mode') == 'dark' ? 'light' : 'dark';
  ui('mode', newMode);
};
</script>
