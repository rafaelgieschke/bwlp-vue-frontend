<template>
  <section class="scroll">
    <SortableTable
      v-if="lectureList.length > 0"
      :items="lectureList"
      :columns="columns"
      item-key="lectureId"
      item-label="lectures"
      @row-click="openModal"
    />
  </section>

  <DetailDialog
    v-if="selectedLecture"
    id="lecture-dialog"
    :title="selectedLecture?.lectureName"
    :is-open="showModal"
    :show-save="false"
    :show-footer="false"
    :tabs="[
      {
        id: 'details',
        icon: 'info',
        label: 'Details',
        component: LectureDetailsTab,
        props: {lecture: selectedLecture},
      },
      {
        id: 'TooManyDetails',
        icon: 'info',
        label: 'TooManyDetails',
        component: LectureTooManyDetailsTab,
        props: {lecture: selectedLecture},
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

import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';

import SortableTable from '@/components/SortableTable.vue';

const columns = [
  {
    field: 'lectureName',
    label: 'Lecture Name',
  },
  {
    field: 'description',
    label: 'Description',
  },
  {
    field: 'endTime',
    label: 'End Time',
    class: 'min',
    formatter: value => $dayjs(value * 1000).format('DD.MM.YYYY, HH:mm'),
  },
];

import DetailDialog from '@/components/dialog/DetailDialog.vue';
import LectureDetailsTab from '@/components/dialog/LectureTabs/LectureDetailsTab.vue';
import LectureTooManyDetailsTab from '@/components/dialog/LectureTabs/LectureTooManyDetailsTab.vue';

const router = useRouter();
const authStore = useAuthStore();

const sat1Server = 'bwlp-pxe.ruf.uni-freiburg.de';

const proto2 = new Thrift.Protocol(
  new Thrift.Transport(`https://${sat1Server}/thrift/`),
);
const sat = new SatelliteServerClient(proto2);

const lectureList = ref([]);
const error = ref('');
const showModal = ref(false);
const selectedLecture = ref(null);

onMounted(() => {
  if (!authStore.authToken) {
    router.push('/login');
  } else {
    fetchLectures();
  }
});

const fetchLectures = async () => {
  try {
    const response = await sat.getLectureList(authStore.authToken, 0);
    lectureList.value = response;
  } catch (e) {
    error.value = e.message;
  }
};

const openModal = async lecture => {
  try {
    selectedLecture.value = await sat.getLectureDetails(
      authStore.authToken,
      lecture.lectureId,
    );

    // This fixes the issue where the dialog is not shown because data not finished loading or sum
    await sat.getLectureDetails(authStore.authToken, lecture.lectureId);
  } catch (e) {
    error.value = e.message;
  }

  showModal.value = true;

  const dialog = document.querySelector('#lecture-dialog');
  dialog.showModal();
};
</script>
