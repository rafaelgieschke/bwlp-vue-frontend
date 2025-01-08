<template>
  <table class="mdui-table" v-if="lectureList.length > 0">
    <thead>
      <tr>
        <th>Lecture Name</th>
        <th>Description</th>
        <th>End Time</th>
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
        <td>
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

  <DetailModalComponent
    :is-open="showModal"
    :title="selectedLecture?.lectureName || ''"
    @close="showModal = false"
  >
    <div v-if="selectedLecture">
      <p><strong>Lecture Name:</strong> {{ selectedLecture.lectureName }}</p>
      <p><strong>Description</strong> {{ selectedLecture.description }}</p>
      <p>
        <strong>End Time:</strong>
        {{
          $dayjs(selectedLecture.endTime * 1000).format('DD.MM.YYYY HH:mm:ss')
        }}
      </p>
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

const openModal = lecture => {
  selectedLecture.value = lecture;
  showModal.value = true;
};
</script>
