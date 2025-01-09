<template>
  <header>
    <nav>
      <button class="circle transparent">
        <i>menu</i>
      </button>
      <h5 class="max center-align">Baden-Württemberg Lehrpool</h5>
      <button class="">
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

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.clearToken();
  router.push('/login');
};
</script>
