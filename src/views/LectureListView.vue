<template>
  <div class="list-view">
    <section class="list" v-if="lectureList.length > 0">
      <table class="mdui-table">
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
            <td>{{ new Date(lecture.endTime * 1000).toJSON() }}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <th colspan="100%">Total lectures: {{ lectureList.length }}</th>
          </tr>
        </tfoot>
      </table>
    </section>

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
          {{ new Date(selectedLecture.endTime * 1000).toJSON() }}
        </p>
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

<style scoped>
/* thead,
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
} */
</style>
