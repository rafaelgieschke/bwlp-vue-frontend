<template>
  <div class="list-view">
    <section class="list" v-if="imageList.length > 0">
      <table>
        <thead>
          <tr>
            <th>Image Name</th>
            <th>Creation Time</th>
            <th>File Size</th>
            <th>Owner</th>
            <th class="aber-hidden">Actions</th>
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
            <td>{{ new Date(image.createTime * 1000).toJSON() }}</td>
            <td>{{ image.fileSize }}</td>
            <td>{{ image.ownerId }}</td>
            <td><button>Delete</button></td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <th colspan="100%">Total Images: {{ imageList.length }}</th>
          </tr>
        </tfoot>
      </table>
    </section>

    <DetailModalComponent
      :is-open="showModal"
      :title="selectedImage?.imageName || ''"
      @close="showModal = false"
    >
      <div v-if="selectedImage">
        <p><strong>Image Name:</strong> {{ selectedImage.imageName }}</p>
        <p>
          <strong>Creation Time:</strong>
          {{ new Date(selectedImage.createTime * 1000).toJSON() }}
        </p>
        <p><strong>File Size:</strong> {{ selectedImage.fileSize }}</p>
        <p><strong>Owner:</strong> {{ selectedImage.ownerId }}</p>
      </div>
    </DetailModalComponent>

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
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

<style scoped>
thead,
tfoot {
  background: url(@/assets/img/leopardskin.jpg);
  color: white;
  text-shadow: 1px 1px 1px black;
}

thead th,
tfoot th,
tfoot td {
  border: 3px solid purple;
  background: linear-gradient(to bottom, rgb(0 0 0 / 10%), rgb(0 0 0 / 50%));
}

tbody tr:nth-child(odd) {
  background-color: #ff33cc;
}

tbody tr:nth-child(even) {
  background-color: #e495e4;
}

tbody tr {
  background-image: url(@/assets/img/noise.png);
}

table {
  width: 100%;
  background-color: #ff33cc;
}

th {
  letter-spacing: 2px;
}

td {
  letter-spacing: 1px;
}

tbody td {
  text-align: center;
}

tfoot th {
  text-align: center;
}

th,
td {
  padding: 10px;
}

.aber-hidden {
  display: none;
}
</style>
