<template>
  <header>
    <nav>
      <button class="circle transparent">
        <i>menu</i>
      </button>
      <h5 class="max center-align">Baden-Württemberg Lehrpool</h5>
      <button class="circle transparent">
        <img class="responsive" src="@/assets/img/leopardskin.jpg" />
      </button>
      <button v-if="authStore.authToken" @click="logout">Logout</button>
    </nav>
  </header>

  <Navigation />

  <main class="example-layout-main">
    <router-view></router-view>
  </main>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';
import Navigation from '@/components/Navigation.vue';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.clearToken();
  router.push('/login');
};
</script>
