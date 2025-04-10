<template>
  <Navigation v-if="authStore.authToken" />
  <HeaderComponent />

  <article
    v-if="activateMinigame"
    class="slow-ripple large-height margin fill minigame-area"
    @click="handleMinigameClick"
  >
    <nav class="center-align middle vertical large-space jumbo-text">
      <p>{{ liveCps || '0' }} clicks/sec</p>
      <p>Peak: {{ peakCps || '0' }} clicks/sec</p>
    </nav>
  </article>

  <main class="responsive">
    <!-- <router-view :key="$route.fullPath"></router-view> -->
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import {ref, computed, onUnmounted, onMounted, watch} from 'vue';
import {useAuthStore} from '@/stores/auth-store';
import {useThemeStore} from '@/stores/theme';
import {useMinigameActivated} from './stores/minigame';

import Navigation from '@/components/navigation/Navigation.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

const authStore = useAuthStore();
const themeStore = useThemeStore();
const minigameStore = useMinigameActivated();

const activateMinigame = computed(() => minigameStore.isMinigameActivated);

const clickTimestamps = ref<number[]>([]);

const liveCps = ref<number>(0);

const peakCps = ref<number>(0);

let cpsUpdateIntervalId: number | null = null;

const CPS_WINDOW_MS = 1000;

const UPDATE_INTERVAL_MS = 100;

const handleMinigameClick = () => {
  clickTimestamps.value.push(performance.now());
};

const updateCps = () => {
  const now = performance.now();

  const windowStartTime = now - CPS_WINDOW_MS;

  clickTimestamps.value = clickTimestamps.value.filter(timestamp => timestamp >= windowStartTime);

  const currentLiveCps = clickTimestamps.value.length;
  liveCps.value = currentLiveCps;

  if (currentLiveCps > peakCps.value) {
    peakCps.value = currentLiveCps;
  }
};

const startCpsCounter = () => {
  if (cpsUpdateIntervalId !== null) {
    clearInterval(cpsUpdateIntervalId);
  }

  clickTimestamps.value = [];
  liveCps.value = 0;
  peakCps.value = 0;

  cpsUpdateIntervalId = window.setInterval(updateCps, UPDATE_INTERVAL_MS);
  console.log('CPS counter started');
};

const stopCpsCounter = () => {
  if (cpsUpdateIntervalId !== null) {
    clearInterval(cpsUpdateIntervalId);
    cpsUpdateIntervalId = null;
  }

  clickTimestamps.value = [];
  liveCps.value = 0;
};

onMounted(() => {
  themeStore.loadPersistedState();

  watch(
    activateMinigame,
    isActive => {
      if (isActive) {
        startCpsCounter();
      } else {
        stopCpsCounter();
      }
    },
    {immediate: true},
  );
});

onUnmounted(() => {
  stopCpsCounter();
});
</script>

<style scoped>
.minigame-area {
  cursor: pointer;
}

.jumbo-text {
  font-size: 42pt;
  user-select: none;
}
</style>
