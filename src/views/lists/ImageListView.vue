<template>
  <table v-if="imageList.length > 0" class="stripes">
    <thead>
      <tr>
        <th>Image Name</th>
        <th>Creation Time</th>
        <th>File Size</th>
        <th>Owner</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="image in imageList"
        @click="openModal(image)"
        :key="image.imageBaseId"
        :id="image.imageBaseId"
      >
        <td>{{ image.imageName }}</td>
        <td>
          {{ $dayjs(image.createTime * 1000).format('DD.MM.YYYY HH:mm:ss') }}
        </td>
        <td>{{ image.fileSize }}</td>
        <td>{{ image.ownerId }}</td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <th colspan="100%">Total Images: {{ imageList.length }}</th>
      </tr>
    </tfoot>
  </table>

  <DetailModalComponent
    :is-open="showModal"
    :title="selectedImage?.imageName || ''"
    @close="showModal = false"
  >
    <div v-if="selectedImage">
      <p><strong>Image Name:</strong> {{ selectedImage.imageName }}</p>
      <p>
        <strong>Creation Time:</strong>
        {{
          $dayjs(selectedImage.createTime * 1000).format('DD.MM.YYYY HH:mm:ss')
        }}
      </p>
      <p><strong>File Size:</strong> {{ selectedImage.fileSize }}</p>
      <p><strong>Owner:</strong> {{ selectedImage.ownerId }}</p>
    </div>
  </DetailModalComponent>

  <p v-if="error" class="error-message">{{ error }}</p>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';
import DetailModalComponent from '@/components/DetailModalComponent.vue';

const router = useRouter();
const authStore = useAuthStore();

const sat1Server = 'bwlp-pxe.ruf.uni-freiburg.de';

const proto2 = new Thrift.Protocol(
  new Thrift.Transport(`https://${sat1Server}/thrift/`),
);
const sat = new SatelliteServerClient(proto2);

const imageList = ref([]);
const error = ref('');
const showModal = ref(false);
const selectedImage = ref(null);

onMounted(() => {
  if (!authStore.authToken) {
    router.push('/login');
  } else {
    fetchImages();
  }
});

const fetchImages = async () => {
  try {
    const response = await sat.getImageList(authStore.authToken, [], 0);
    imageList.value = response;
  } catch (e) {
    error.value = e.message;
  }
};

const openModal = image => {
  selectedImage.value = image;
  showModal.value = true;
};
</script>
