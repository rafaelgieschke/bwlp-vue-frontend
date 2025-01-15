<template>
  <section class="scroll">
    <table v-if="lectureList.length > 0" class="stripes">
      <thead>
        <tr>
          <th @click="sort('lectureName')" class="sortable">
            Lecture Name
            <span class="sort-icon">{{ getSortIcon('lectureName') }}</span>
          </th>
          <th @click="sort('description')" class="sortable">
            Description
            <span class="sort-icon">{{ getSortIcon('description') }}</span>
          </th>
          <th @click="sort('endTime')" class="sortable min">
            End Time
            <span class="sort-icon">{{ getSortIcon('endTime') }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="lecture in sortedLectures"
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
import {ref, onMounted, computed} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';

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

// Sorting state
const sortField = ref('default');
const sortOrder = ref('asc');

const getSortIcon = field => {
  if (sortField.value === 'default' || sortField.value !== field) return '⇕';
  return sortOrder.value === 'asc' ? '↑' : '↓';
};

const sort = field => {
  if (sortField.value === field) {
    if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc';
    } else if (sortOrder.value === 'desc') {
      sortField.value = 'default';
      sortOrder.value = 'asc';
    }
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }
};

const sortedLectures = computed(() => {
  if (sortField.value === 'default') {
    return lectureList.value;
  }

  return [...lectureList.value].sort((a, b) => {
    let compareValue = 0;

    if (sortField.value === 'endTime') {
      compareValue = a.endTime - b.endTime;
    } else {
      const aValue = a[sortField.value]?.toLowerCase() || '';
      const bValue = b[sortField.value]?.toLowerCase() || '';
      compareValue = aValue.localeCompare(bValue);
    }

    return sortOrder.value === 'asc' ? compareValue : -compareValue;
  });
});

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

<style scoped>
.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.sort-icon {
  display: inline-block;
  margin-left: 4px;
}
</style>
