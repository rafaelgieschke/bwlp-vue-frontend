<template>
  <section class="scroll">
    <SortableTable
      v-if="imageList.length > 0"
      :items="imageList"
      :columns="columns"
      item-key="imageBaseId"
      item-label="Images"
      @row-click="openModal"
    />
  </section>

  <DetailDialog
    v-if="selectedImage"
    id="image-dialog"
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

import $dayjs from 'dayjs';
import {humanFileSize} from '@/utils/fileSize';

import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';

import SortableTable from '@/components/SortableTable.vue';

const columns = [
  {
    field: 'imageName',
    label: 'Image Name',
  },
  {
    field: 'createTime',
    label: 'Creation Time',
    formatter: value => $dayjs(value * 1000).format('DD.MM.YYYY HH:mm:ss'),
  },
  {
    field: 'fileSize',
    label: 'File Size',
    class: 'min',
    formatter: value => humanFileSize(value),
  },
  {
    field: 'ownerId',
    label: 'Owner',
    class: 'min',
  },
];

import DetailDialog from '@/components/dialog/DetailDialog.vue';
import ImageDetailsTab from '@/components/dialog/ImageTabs/ImageDetailsTab.vue';
import ImageVersionsTab from '@/components/dialog/ImageTabs/ImageVersionsTab.vue';
import ImagePermissionsTab from '@/components/dialog/ImageTabs/ImagePermissionsTab.vue';

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

  const dialog = document.querySelector('#image-dialog');
  dialog.showModal();
};
</script>
