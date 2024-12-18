<template>
  <header>
    <h1>Baden-Württemberg Lehrpool</h1>
    <button v-if="authToken !== ''" @click="logout">Logout</button>
  </header>

  <router-view></router-view>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let authToken = ref(localStorage.getItem('authToken') || '');

const logout = () => {
  localStorage.removeItem('authToken');
  authToken.value = '';
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
</style>
