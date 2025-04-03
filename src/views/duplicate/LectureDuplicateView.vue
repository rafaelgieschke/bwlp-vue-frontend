<template>
  <div>
    <ErrorMessage v-if="error" :error="error" default-message="Unable to duplicate lecture" />

    <h1>Duplicate Lecture</h1>

    <div v-if="loading" class="center">
      <div class="preloader"></div>
      <p>Loading lecture data...</p>
    </div>

    <div v-else class="confirmation-card">
      <h2>Confirm Duplication</h2>
      <p>Are you sure you want to duplicate the lecture "{{ itemData.lectureName }}"?</p>

      <div class="lecture-details">
        <p><strong>Description:</strong> {{ itemData.description }}</p>
        <p>
          <strong>Start Time:</strong>
          {{ formatDate(itemData.startTime * 1000, 'DD.MM.YYYY, HH:mm') }}
        </p>
        <p>
          <strong>End Time:</strong> {{ formatDate(itemData.endTime * 1000, 'DD.MM.YYYY, HH:mm') }}
        </p>
      </div>

      <div class="action-buttons">
        <button class="primary" @click="duplicateLecture">
          <i>content_copy</i>
          Duplicate Lecture
        </button>
        <button class="border" @click="goBack">
          <i>arrow_back</i>
          Cancel
        </button>
      </div>
    </div>
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
    // Set the duplicated lecture data, with a small modification to the name
    itemData.value = {
      ...lectureData,
      lectureName: `${lectureData.lectureName} (Copy)`,
      // Remove the lectureId property to ensure we create a new lecture
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
const formatDateTime = dateTime => {
  if (!dateTime) return 'Not set';

  return new Date(dateTime).toLocaleString();
};
</script>

<style scoped>
.confirmation-card {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.lecture-details {
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.03);
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  gap: 1rem;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
}
</style>
