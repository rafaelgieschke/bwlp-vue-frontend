<template>
  <div>
    <ErrorMessage
      v-if="error"
      :error="error"
      default-message="Unable to load or update lecture"
    />

    <pre>{{ itemData }}</pre>

    <h1>Edit {{ itemData.lectureName }}</h1>

    <form @submit.prevent="saveItem">
      <div class="field label border">
        <input v-model="itemData.lectureName" />
        <label>Lecture Name</label>
      </div>
      <div class="field label border">
        <input v-model="itemData.description" />
        <label>Lecture Name</label>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';

import ErrorMessage from '@/components/error/ErrorMessage.vue';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

// const sat1Server = 'bwlp-pxe.ruf.uni-freiburg.de';
const sat1Server = '10.4.9.57';

const proto2 = new Thrift.Protocol(
  new Thrift.Transport(`https://${sat1Server}/thrift/`),
);
const sat = new SatelliteServerClient(proto2);

const itemData = ref({});
const error = ref(null);

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
    router.push('/lecture-list');
  } catch (err) {
    console.error('Failed to update lecture:', err);
    error.value = err;
  }
};
</script>
