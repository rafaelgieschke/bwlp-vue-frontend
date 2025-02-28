<template>
  <div>
    <ErrorMessage
      v-if="error"
      :error="error"
      default-message="Unable to load or update image"
    />

    <ItemDataPre v-if="devMode" :item-data="itemData" />

    <h1>Edit {{ itemData.imageName }}</h1>

    <form @submit.prevent="saveItem">
      <ProgressIndicator
        v-model:currentStep="currentStep"
        :steps="['Basic Info', 'Version', 'Sharing']"
      />

      <article class="large scroll">
        <ImageStep1BasicInfo v-show="currentStep === 1" v-model="itemData" />
        <ImageStep2Versions v-show="currentStep === 2" v-model="itemData" />
        <ImageStep3Sharing v-show="currentStep === 3" v-model="itemData" />
      </article>

      <EditNavigationButtons
        :prev-step="prevStep"
        :next-step="nextStep"
        :current-step="currentStep"
        :total-steps="3"
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
import ProgressIndicator from '@/components/edit/ProgressIndicator.vue';
import EditNavigationButtons from '@/components/edit/EditNavigationButtons.vue';

import ImageStep1BasicInfo from '@/components/edit/steps/image/ImageStep1BasicInfo.vue';
import ImageStep2Versions from '@/components/edit/steps/image/ImageStep2Versions.vue';
import ImageStep3Sharing from '@/components/edit/steps/image/ImageStep3Sharing.vue';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const devMode = ref(import.meta.env.VITE_DEVELOPMENT_MODE === 'true');

import {useSatServer} from '@/composables/useSatServer';
const sat = useSatServer();

const itemData = ref({
  imageBaseId: '',
  latestVersionId: null,
  versions: [],
  imageName: '',
  description: '',
  tags: [],
  osId: 0,
  virtId: 'vmware',
  createTime: 0,
  updateTime: 0,
  ownerId: '',
  updaterId: '',
  shareMode: 0,
  isTemplate: false,
  defaultPermissions: {
    link: true,
    download: true,
    edit: false,
    admin: false,
  },
  userPermissions: {
    link: true,
    download: true,
    edit: true,
    admin: true,
  },
});

const error = ref(null);
const currentStep = ref(1);

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

onMounted(async () => {
  try {
    itemData.value = await sat.getImageDetails(
      authStore.authToken,
      route.params.id,
    );
  } catch (err) {
    console.error('Failed to fetch image details:', err);
    error.value = err;
  }
});

const saveItem = async () => {
  try {
    await sat.updateImageBase(
      authStore.authToken,
      itemData.value.imageBaseId,
      itemData.value,
    );
    router.push('/image');
  } catch (err) {
    console.error('Failed to update image:', err);
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
