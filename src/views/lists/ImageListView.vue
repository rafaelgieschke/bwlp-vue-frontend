<template>
  <template v-if="$route.name === 'ImageList'">
    <ErrorMessage
      v-if="error"
      :error="error"
      default-message="There's been an error of some kind"
    />

    <Transition name="slide-fade">
      <SortableTable
        v-if="imageList.length > 0"
        :items="imageList"
        :columns="columns"
        item-key="imageBaseId"
        item-label="Images"
        @row-click="openModal"
      />
    </Transition>

    <DetailDialog
      v-if="selectedImage"
      id="image-dialog"
      :title="selectedImage?.imageName"
      :editRoute="{
        name: 'ImageEdit',
        params: {id: selectedImage?.imageBaseId},
      }"
      :is-open="showModal"
      :tabs="
        imageTabs.map(tab => ({
          ...tab,
          props: tab.props(selectedImage, imagePermissions),
        }))
      "
      @close-wanted="showModal = false"
    />
  </template>

  <template v-if="$route.name === 'ImageEdit'">
    <router-view></router-view>
  </template>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import $dayjs from 'dayjs';

import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';

import ErrorMessage from '@/components/error/ErrorMessage.vue';

import SortableTable from '@/components/SortableTable.vue';

/// TODO: But for in a long time, we could make it a setting that the user can decide for themselves
const columns = [
  {
    field: 'imageName',
    label: 'Image Name',
  },
  {
    field: 'osId',
    label: 'OS',
    class: 'min',
  },
  {
    field: 'ownerId',
    label: 'Owner',
    class: 'min',
  },
  {
    field: 'expireTime',
    label: 'Expire Time',
    class: 'min',
    formatter: value => $dayjs(value * 1000).format('DD.MM.YYYY HH:mm'),
  },
  {
    field: 'virtId',
    class: 'min',
  },
];

import DetailDialog from '@/components/dialog/DetailDialog.vue';
import ImageDetailsTab from '@/components/dialog/ImageTabs/ImageDetailsTab.vue';
import ImageVersionsTab from '@/components/dialog/ImageTabs/ImageVersionsTab.vue';
import ImageLecturePermissionsTab from '@/components/dialog/ImageLecturePermissionsTab.vue';

const imageTabs = [
  {
    id: 'details',
    icon: 'info',
    label: 'Details',
    component: ImageDetailsTab,
    props: image => ({image}),
  },
  {
    id: 'versions',
    icon: 'history',
    label: 'Versions',
    component: ImageVersionsTab,
    props: image => ({versions: image?.versions}),
  },
  {
    id: 'permissions',
    icon: 'key',
    label: 'Permissions',
    component: ImageLecturePermissionsTab,
    props: (image, imagePermissions) => ({
      permissions: imagePermissions,
      defaultPermissions: image?.defaultPermissions,
    }),
  },
];

const router = useRouter();
const authStore = useAuthStore();

import {useSat1Server} from '@/composables/useSat1Server';
const sat1Server = useSat1Server();

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

    showModal.value = true;
  } catch (e) {
    error.value = e.message;
  }
};
</script>
