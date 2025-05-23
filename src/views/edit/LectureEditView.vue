<template>
  <div>
    <ErrorMessage v-if="error" :error="error" default-message="Unable to load or update lecture" />

    <ItemDataPre v-if="devMode" :item-data="itemData" />

    <h1>Edit {{ itemData.lectureName }}</h1>

    <form @submit.prevent="saveItem">
      <ProgressIndicator v-model:currentStep="currentStep" :steps="steps" />

      <article class="large scroll">
        <Transition name="page-slide-fast" mode="out-in">
          <Step1BasicInfo v-if="currentStep === 1" v-model="itemData" />
          <Step2Permissions v-else-if="currentStep === 2" v-model="itemData" />
          <Step3Network v-else-if="currentStep === 3" v-model="itemData" />
          <Step4Advanced v-else-if="currentStep === 4" v-model="itemData" />
        </Transition>
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
import {ref, onMounted} from '@vue/runtime-core';
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import ErrorMessage from '@/components/error/ErrorMessage.vue';
import ItemDataPre from '@/components/ItemDataPre.vue';

import ProgressIndicator from '@/components/edit-create/steps/steps-components/ProgressIndicator.vue';
import Step1BasicInfo from '@/components/edit-create/steps/edit/lecture/LectureStep1BasicInfo.vue';
import Step2Permissions from '@/components/edit-create/steps/edit/lecture/LectureStep2Permissions.vue';
import Step3Network from '@/components/edit-create/steps/edit/lecture/LectureStep3Network.vue';
import Step4Advanced from '@/components/edit-create/steps/edit/lecture/LectureStep4Advanced.vue';
import EditNavigationButtons from '@/components/edit-create/steps/steps-components/EditNavigationButtons.vue';

const route = useRoute();
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

onMounted(async () => {
  try {
    itemData.value = await sat.getLectureDetails(authStore.authToken, route.params.id);
  } catch (err) {
    console.error('Failed to fetch lecture details:', err);
    error.value = err;
  }
});

const saveItem = async () => {
  try {
    await sat.updateLecture(authStore.authToken, itemData.value.lectureId, itemData.value);
    router.push(`/lecture/${itemData.value.lectureId}`);
  } catch (err) {
    console.error('Failed to update lecture:', err);
    error.value = err;
  }
};
</script>
