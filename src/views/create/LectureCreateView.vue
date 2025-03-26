<template>
  <div>
    <ErrorMessage v-if="error" :error="error" default-message="Unable to create lecture" />

    <ItemDataPre v-if="devMode" :item-data="itemData" />

    <h1>Create Lecture</h1>

    <form @submit.prevent="saveItem">
      <ProgressIndicator v-model:currentStep="currentStep" :steps="steps" />

      <article class="large scroll">
        <Step1BasicInfo v-show="currentStep === 1" v-model="itemData" />
      </article>

      <EditNavigationButtons
        :prev-step="prevStep"
        :next-step="nextStep"
        :current-step="currentStep"
        :total-steps="steps.length"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from '@vue/runtime-core';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import ErrorMessage from '@/components/error/ErrorMessage.vue';
import ItemDataPre from '@/components/ItemDataPre.vue';

import ProgressIndicator from '@/components/edit-create/ProgressIndicator.vue';
import Step1BasicInfo from '@/components/edit-create/steps/create/lecture/LectureStep1BasicInfo.vue';
import EditNavigationButtons from '@/components/edit-create/EditNavigationButtons.vue';

const router = useRouter();
const authStore = useAuthStore();
const devMode = ref(import.meta.env.VITE_DEVELOPMENT_MODE === 'true');

import {useSatServer} from '@/composables/useSatServer';
const sat = useSatServer();

const steps = ref(['Basic Info', 'Permissions', 'Network', 'Advanced']);

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
const currentStep = ref(1);

const nextStep = () => {
  if (currentStep.value < steps.value.length) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const saveItem = async () => {
  try {
    await sat.createLecture(authStore.authToken, itemData.value);
    router.push('/lecture');
  } catch (err) {
    console.error('Failed to create lecture:', err);
    error.value = err;
  }
};
</script>

<style scoped>
form {
  max-inline-size: 860px;
  margin: 0 auto;
}
</style>
