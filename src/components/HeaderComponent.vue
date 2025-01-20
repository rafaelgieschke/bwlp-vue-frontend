<template>
  <header>
    <nav>
      <MobileNavigation v-if="authStore.authToken" />

      <h5 class="l max center-align">Baden-Württemberg Lehrpool</h5>
      <div class="m max center-align"></div>
      <nav class="s max center-align">
        <img
          class="small"
          src="@/assets/img/bwLogo/bwLehrpool_small.png"
          alt="BWLP Logo"
        />
        <h5>BW Lehrpool</h5>
      </nav>

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

const mode = () => {
  let newMode = ui('mode') == 'dark' ? 'light' : 'dark';
  ui('mode', newMode);
};
</script>
