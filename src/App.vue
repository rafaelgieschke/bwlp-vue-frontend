<template>
  <Navigation v-if="authStore.authToken" />
  <HeaderComponent />

  <main class="responsive">
    <!-- <router-view :key="$route.fullPath"></router-view> -->
    <router-view></router-view>
  </main>

  <Minigame v-if="activateMinigame" />
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue';
import {useAuthStore} from '@/stores/auth-store';
import {useThemeStore} from '@/stores/theme';
import {useMinigameActivated} from '@/stores/minigame';

import Navigation from '@/components/navigation/Navigation.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import Minigame from '@/components/Minigame.vue';

const authStore = useAuthStore();
const themeStore = useThemeStore();
const minigameStore = useMinigameActivated();

const activateMinigame = computed(() => minigameStore.isMinigameActivated);

onMounted(() => {
  themeStore.loadPersistedState();
});
</script>
