<template>
  <section class="scroll">
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
          <td class="min">
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
  </section>

  <DetailDialog
    v-if="selectedImage"
    :title="selectedImage?.imageName"
    :is-open="showModal"
    :show-save="false"
    :show-footer="false"
    :tabs="[
      {
        id: 'details',
        icon: 'info',
        label: 'Details',
        component: ImageDetailsTab,
        props: {image: selectedImage},
      },
      {
        id: 'versions',
        icon: 'history',
        label: 'Versions',
        component: ImageVersionsTab,
        props: {versions: selectedImage?.versions},
      },
      {
        id: 'permissions',
        icon: 'lock',
        label: 'Permissions',
        component: ImagePermissionsTab,
        props: {
          permissions: imagePermissions,
          defaultPermissions: selectedImage?.defaultPermissions,
        },
      },
    ]"
  />

  <p v-if="error" class="error-message">{{ error }}</p>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';

import DetailDialog from '@/components/DetailDialog.vue';
import ImageDetailsTab from '@/components/DialogTabs/ImageTabs/ImageDetailsTab.vue';
import ImageVersionsTab from '@/components/DialogTabs/ImageTabs/ImageVersionsTab.vue';
import ImagePermissionsTab from '@/components/DialogTabs/ImageTabs/ImagePermissionsTab.vue';

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
const imagePermissions = ref({});

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

const openModal = async image => {
  try {
    selectedImage.value = await sat.getImageDetails(
      authStore.authToken,
      image.imageBaseId,
    );

    imagePermissions.value = await sat.getImagePermissions(
      authStore.authToken,
      image.imageBaseId,
    );
  } catch (e) {
    error.value = e.message;
  }

  showModal.value = true;

  const dialog = document.querySelector('dialog');
  dialog.showModal();
};
</script>
