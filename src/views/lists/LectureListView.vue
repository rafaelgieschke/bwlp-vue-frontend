<template>
  <section class="scroll">
    <table v-if="lectureList.length > 0" class="stripes">
      <thead>
        <tr>
          <th>Lecture Name</th>
          <th>Description</th>
          <th class="min">End Time</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="lecture in lectureList"
          @click="openModal(lecture)"
          :key="lecture.lectureId"
          :id="lecture.lectureId"
        >
          <td>{{ lecture.lectureName }}</td>
          <td>{{ lecture.description }}</td>
          <td class="min">
            {{ $dayjs(lecture.endTime * 1000).format('DD.MM.YYYY HH:mm:ss') }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="100%">Total lectures: {{ lectureList.length }}</th>
        </tr>
      </tfoot>
    </table>
  </section>

  <DetailDialog
    v-if="selectedLecture"
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

import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';

import DetailDialog from '@/components/DetailDialog.vue';
import LectureDetailsTab from '@/components/DialogTabs/LectureTabs/LectureDetailsTab.vue';
import LectureTooManyDetailsTab from '@/components/DialogTabs/LectureTabs/LectureTooManyDetailsTab.vue';

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
    // For Julien after the holidays, as you can see, with getLectureList, we have to pass it (authToken, 0) as parameters
    // But with getImageList, we have to pass it (authToken, [], 0) as parameters
    // So if it doesn't work, just print the shit out of what you're getting out of thin air and if it gives you empty that means
    // Go check the declaration to see what it requires
    // Could be a decent idea to make it the same for them all if there's an easy way to do it.
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
  } catch (e) {
    error.value = e.message;
  }

  showModal.value = true;

  const dialog = document.querySelector('dialog');
  dialog.showModal();
};
</script>
