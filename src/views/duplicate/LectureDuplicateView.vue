<template>
  <div>
    <ErrorMessage v-if="error" :error="error" default-message="Unable to duplicate lecture" />

    <h1>Duplicate Lecture</h1>

    <article v-if="loading" class="info">
      <div class="preloader"></div>
      <p>Loading lecture data...</p>
    </article>

    <article v-else>
      <h2>Confirm Duplication</h2>
      <p>
        Are you sure you want to duplicate the lecture
        <span class="bold">{{ itemData.lectureName }}</span
        >?
      </p>

      <div class="top-margin padding">
        <p><span class="bold">Description:</span> {{ itemData.description }}</p>
        <p>
          <span class="bold">Start Time:</span>
          {{ formatDate(itemData.startTime * 1000, 'DD.MM.YYYY, HH:mm') }}
        </p>
        <p>
          <span class="bold">End Time:</span>
          {{ formatDate(itemData.endTime * 1000, 'DD.MM.YYYY, HH:mm') }}
        </p>
      </div>

      <nav class="right-align">
        <button class="primary ripple" @click="duplicateLecture">
          <i>content_copy</i>
          Duplicate Lecture
        </button>
        <button class="border ripple" @click="goBack">
          <i>arrow_back</i>
          Cancel
        </button>
      </nav>
    </article>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from '@vue/runtime-core';
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';
import {useDateFormat} from '@vueuse/core';
import ErrorMessage from '@/components/error/ErrorMessage.vue';

import {useSatServer} from '@/composables/useSatServer';
const sat = useSatServer();

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const itemData = ref({
  lectureName: '',
  description: '',
  startTime: null,
  endTime: null,
  isEnabled: false,
  isExam: false,
  hasInternetAccess: false,
  hasUsbAccess: false,
  autoUpdate: false,
  limitToLocations: false,
});
const error = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const lectureData = await sat.getLectureDetails(authStore.authToken, route.params.id);
    itemData.value = {
      ...lectureData,
      lectureName: `${lectureData.lectureName} (Copy)`,
      lectureId: undefined,
    };
    loading.value = false;
  } catch (err) {
    console.error('Failed to fetch lecture details:', err);
    error.value = err;
    loading.value = false;
  }
});

const duplicateLecture = async () => {
  try {
    await sat.createLecture(authStore.authToken, itemData.value);
    router.push('/lecture');
  } catch (err) {
    console.error('Failed to duplicate lecture:', err);
    error.value = err;
  }
};

const goBack = () => {
  router.back();
};

const formatDate = (timestamp: number, format: string) => {
  return useDateFormat(timestamp, format).value;
};
</script>
