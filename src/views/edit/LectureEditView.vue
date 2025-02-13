<template>
  <div>
    <ErrorMessage
      v-if="error"
      :error="error"
      default-message="Unable to load or update lecture"
    />

    <ItemDataPre v-if="devMode" :itemData="itemData" />

    <h1>Edit {{ itemData.lectureName }}</h1>

    <form @submit.prevent="saveItem">
      <ProgressIndicator v-model:currentStep="currentStep" />

      <article class="large scroll">
        <Step1BasicInfo v-show="currentStep === 1" v-model="itemData" />
        <Step2Permissions v-show="currentStep === 2" v-model="itemData" />
        <Step3Network v-show="currentStep === 3" v-model="itemData" />
        <Step4Advanced v-show="currentStep === 4" v-model="itemData" />
      </article>

      <EditNavigationButtons
        :prevStep="prevStep"
        :nextStep="nextStep"
        :currentStep="currentStep"
      />
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import ErrorMessage from '@/components/error/ErrorMessage.vue';
import ItemDataPre from '@/components/ItemDataPre.vue';

import ProgressIndicator from '@/components/edit/ProgressIndicator.vue';
import Step1BasicInfo from '@/components/edit/steps/Step1BasicInfo.vue';
import Step2Permissions from '@/components/edit/steps/Step2Permissions.vue';
import Step3Network from '@/components/edit/steps/Step3Network.vue';
import Step4Advanced from '@/components/edit/steps/Step4Advanced.vue';
import EditNavigationButtons from '@/components/edit/EditNavigationButtons.vue';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const devMode = ref(import.meta.env.VITE_DEVELOPMENT_MODE === 'true');

import {useSatServer} from '@/composables/useSatServer';
const sat = useSatServer();

const itemData = ref({});
const error = ref(null);
const currentStep = ref(1);

const nextStep = () => {
  if (currentStep.value < 4) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

onMounted(async () => {
  try {
    itemData.value = await sat.getLectureDetails(
      authStore.authToken,
      route.params.id,
    );
  } catch (err) {
    console.error('Failed to fetch lecture details:', err);
    error.value = err;
  }
});

const saveItem = async () => {
  try {
    await sat.updateLecture(
      authStore.authToken,
      itemData.value.lectureId,
      itemData.value,
    );
    router.push('/lecture');
  } catch (err) {
    console.error('Failed to update lecture:', err);
    error.value = err;
  }
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
