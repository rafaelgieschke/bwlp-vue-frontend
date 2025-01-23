<template>
  <div>
    <h2>Edit {{ itemData.lectureName }}</h2>
    <form @submit.prevent="saveItem">
      <div class="field label border">
        <input v-model="itemData.lectureName" />
        <label>Label</label>
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

onMounted(async () => {
  itemData.value = await sat.getLectureDetails(
    authStore.authToken,
    route.params.id,
  );
});

const saveItem = async () => {
  await sat.updateLecture(itemData.value, route.params.id);
  router.push('/items');
};
</script>
