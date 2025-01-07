<template>
  <div class="app-container">
    <Navigation />

    <div class="content-container">
      <header>
        <h1>Baden-Württemberg Lehrpool</h1>
        <mdui-button v-if="authStore.authToken" @click="logout"
          >Logout</mdui-button
        >
      </header>

      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
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

<style scoped>
.app-container {
  display: flex;
}

.content-container {
  flex-grow: 1;
}

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
}
</style>
