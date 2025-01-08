<template>
  <mdui-layout>
    <mdui-top-app-bar class="example-top-app-bar">
      <mdui-top-app-bar-title>
        Baden-Württemberg Lehrpool
      </mdui-top-app-bar-title>

      <mdui-button v-if="authStore.authToken" @click="logout">
        Logout
      </mdui-button>
    </mdui-top-app-bar>

    <mdui-navigation-drawer open class="example-navigation-drawer">
      <Navigation />
    </mdui-navigation-drawer>

    <mdui-layout-main class="example-layout-main">
      <router-view></router-view>
    </mdui-layout-main>
  </mdui-layout>
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
