<template>
  <header>
    <h1>Baden-Württemberg Lehrpool</h1>
    <button v-if="authStore.authToken" @click="logout">Logout</button>
  </header>

  <main>
    <router-view></router-view>
  </main>
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

<style scoped>
main,
header {
  max-width: 1280px;
  margin: 0 auto;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: aliceblue;
}
</style>
