<template>
  <Navigation v-if="authStore.authToken" />
  <HeaderComponent />

  <main class="responsive">
    <router-view></router-view>
  </main>
</template>

<script lang="ts" setup>
import {onMounted} from '@vue/runtime-core';
import {useAuthStore} from '@/stores/auth-store';
import {useThemeStore} from '@/stores/theme';

import Navigation from '@/components/navigation/Navigation.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

const authStore = useAuthStore();
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.loadPersistedState();
});

</script>
