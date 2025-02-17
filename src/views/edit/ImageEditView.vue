<template>
  <div>
    <ErrorMessage
      v-if="error"
      :error="error"
      default-message="Unable to load or update image"
    />

    <ItemDataPre v-if="devMode" :itemData="itemData" />

    <h1>Edit {{ itemData.imageName }}</h1>

    <form @submit.prevent="saveItem">
      <div class="field label border">
        <input v-model="itemData.imageName" />
        <label>Image Name</label>
      </div>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from '@vue/runtime-core';
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import ErrorMessage from '@/components/error/ErrorMessage.vue';
import ItemDataPre from '@/components/ItemDataPre.vue';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const devMode = ref(import.meta.env.VITE_DEVELOPMENT_MODE === 'true');

import {useSatServer} from '@/composables/useSatServer';
const sat = useSatServer();

const itemData = ref({});

const error = ref(null);

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
