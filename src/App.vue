<template>
  <Navigation v-if="authStore.authToken" />
  <HeaderComponent />

  <article v-if="activateMinigame" class="slow-ripple large-height margin secondary"></article>

  <main class="responsive">
    <!-- <router-view :key="$route.fullPath"></router-view> -->
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import {onMounted, computed} from '@vue/runtime-core';
import {useAuthStore} from '@/stores/auth-store';
import {useThemeStore} from '@/stores/theme';
import {useMinigameActivated} from './stores/minigame';

import Navigation from '@/components/navigation/Navigation.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

const authStore = useAuthStore();
const themeStore = useThemeStore();
const minigameStore = useMinigameActivated();

const activateMinigame = computed(() => minigameStore.isMinigameActivated);

onMounted(() => {
  themeStore.loadPersistedState();
});
</script>
