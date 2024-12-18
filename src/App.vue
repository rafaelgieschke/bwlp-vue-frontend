<template>
  <header>
    <h1>Baden-Württemberg Lehrpool</h1>
    <button v-if="authStore.authToken" @click="logout">Logout</button>
  </header>

  <router-view></router-view>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth-store';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.clearToken();
  router.push('/login');
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

button {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: #e0e0e0;
}
</style>
