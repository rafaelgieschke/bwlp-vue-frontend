<template>
  <Navigation v-if="authStore.authToken" />
  <HeaderComponent />

  <main class="responsive">
    <router-view></router-view>
  </main>
</template>

<script setup>
import {useAuthStore} from '@/stores/auth-store';

import Navigation from '@/components/navigation/Navigation.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

const authStore = useAuthStore();
</script>
