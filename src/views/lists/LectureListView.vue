<template>
  <template v-if="['LectureList', 'LectureDetail'].includes($route.name as string)">
    <ErrorMessage
      v-if="error"
      :error="error"
      default-message="There's been an error of some kind"
    />

    <Transition name="slide-fade">
      <SortableTable
        v-if="lectureList.length > 0"
        :items="lectureList"
        :columns="columns"
        item-key="lectureId"
        item-label="lectures"
        @row-click="openModal"
        :footer-colspan="columns.length - 2"
        create-route="LectureCreate"
      />
    </Transition>

    <DetailDialog
      v-if="selectedLecture"
      id="lecture-dialog"
      :title="selectedLecture?.lectureName"
      :edit-route="{
        name: 'LectureEdit',
        params: {id: selectedLecture?.lectureId},
      }"
      :duplicate-route="{
        name: 'LectureDuplicate',
        params: {id: selectedLecture?.lectureId},
      }"
      :is-open="showModal"
      :tabs="
        lectureTabs.map(tab => ({
          ...tab,
          props: tab.props(selectedLecture, lectureLocations, lecturePermissions),
        }))
      "
      @close-wanted="handleCloseDialog"
    />
  </template>

  <template v-if="!['LectureList', 'LectureDetail'].includes($route.name as string)">
    <router-view></router-view>
  </template>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from '@vue/runtime-core';
import {useRouter, useRoute, onBeforeRouteUpdate} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';
import {useDateFormat} from '@vueuse/core';

import ErrorMessage from '@/components/error/ErrorMessage.vue';
import SortableTable from '@/components/SortableTable.vue';

const formatDate = (timestamp: number, format: string) => {
  return useDateFormat(timestamp, format).value;
};

const columns = [
  {
    field: 'lectureName',
    label: 'Lecture Name',
  },
  {
    field: 'ownerId',
    label: 'Owner',
    class: 'min',
  },
  {
    field: 'startTime',
    label: 'Start Time',
    class: 'min',
    formatter: value => (value > 0 ? formatDate(value * 1000, 'DD.MM.YYYY, HH:mm') : '-'),
  },
  {
    field: 'endTime',
    label: 'End Time',
    class: 'min',
    formatter: value => (value > 0 ? formatDate(value * 1000, 'DD.MM.YYYY, HH:mm') : '-'),
  },
  {
    field: 'isEnabled',
    label: 'Activated',
    class: 'min',
  },
];

import DetailDialog from '@/components/dialog/DetailDialog.vue';
import LectureDetailsTab from '@/components/dialog/LectureTabs/LectureDetailsTab.vue';
import LectureRestrictionsTab from '@/components/dialog/LectureTabs/LectureRestrictionsTab.vue';
import LectureFirewallTab from '@/components/dialog/LectureTabs/LectureFirewallTab.vue';
import LectureRoomSelectionTab from '@/components/dialog/LectureTabs/LectureRoomSelectionTab.vue';
import LectureVMStartTab from '@/components/dialog/LectureTabs/LectureVMStartTab.vue';
import LectureNetworkDrivesTab from '@/components/dialog/LectureTabs/LectureNetworkDrivesTab.vue';
import LectureLDAPFilterTab from '@/components/dialog/LectureTabs/LectureLDAPFilterTab.vue';
import ImageLecturePermissionsTab from '@/components/dialog/ImageLecturePermissionsTab.vue';

/// TODO: But for in a long time, we could make it a setting that the user can decide for themselves
/// Use Pinia for it? it's per browser but we could make it somehow easily syncable
const lectureTabs = [
  {
    id: 'details',
    icon: 'info',
    label: 'Allgemein',
    component: LectureDetailsTab,
    props: lecture => ({lecture}),
  },
  {
    id: 'restrictions',
    icon: 'folder_limited',
    label: 'Beschränkungen',
    component: LectureRestrictionsTab,
    props: lecture => ({lecture}),
  },
  {
    id: 'firewall',
    icon: 'local_fire_department',
    label: 'Firewall',
    component: LectureFirewallTab,
    props: lecture => ({lecture}),
  },
  {
    id: 'room-selection',
    icon: 'room_preferences',
    label: 'Raumauswahl',
    component: LectureRoomSelectionTab,
    props: (lecture, locations) => ({lecture, locations}),
  },
  {
    id: 'vm-start',
    icon: 'line_start_circle',
    label: 'VM-Start',
    component: LectureVMStartTab,
    props: lecture => ({lecture}),
  },
  {
    id: 'permissions',
    icon: 'key',
    label: 'Berechtigungen',
    component: ImageLecturePermissionsTab,
    props: (lecture, _, lecturePermissions) => ({
      permissions: lecturePermissions,
      defaultPermissions: lecture?.defaultPermissions,
    }),
  },
  {
    id: 'network-drives',
    icon: 'cloud',
    label: 'Netzlaufwerke',
    component: LectureNetworkDrivesTab,
    props: lecture => ({lecture}),
  },
  {
    id: 'ldap-filter',
    icon: 'filter_alt',
    label: 'LDAP-Filter',
    component: LectureLDAPFilterTab,
    props: lecture => ({lecture}),
  },
];

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

import {useSatServer} from '@/composables/useSatServer';
const sat = useSatServer();

const lectureList = ref([]);
const error = ref('');
const showModal = ref(false);
const selectedLecture = ref(null);
const lectureLocations = ref({});
const lecturePermissions = ref({});

onMounted(() => {
  if (!authStore.authToken) {
    router.push('/login');
  } else {
    fetchLectures().then(() => {
      if (route.name === 'LectureDetail' && route.params.id) {
        loadLectureById(route.params.id as string);
      }
    });
  }
});

const fetchLectures = async () => {
  try {
    const response = await sat.getLectureList(authStore.authToken, 0);
    lectureList.value = response;
    return response;
  } catch (e) {
    error.value = e.message;
    return [];
  }
};

const loadLectureById = async (lectureId: string) => {
  try {
    // Find the lecture in the list to confirm it exists
    const lecture = lectureList.value.find(lec => lec.lectureId === lectureId);

    if (lecture) {
      await openModal(lecture);
    } else {
      // Try to fetch it directly if not found in the list
      selectedLecture.value = await sat.getLectureDetails(authStore.authToken, lectureId);
      lectureLocations.value = await sat.getLocations(authStore.authToken, lectureId);
      lecturePermissions.value = await sat.getLecturePermissions(authStore.authToken, lectureId);
      showModal.value = true;
    }
  } catch (e) {
    error.value = e.message;
  }
};

const openModal = async lecture => {
  try {
    selectedLecture.value = await sat.getLectureDetails(authStore.authToken, lecture.lectureId);
    lectureLocations.value = await sat.getLocations(authStore.authToken, lecture.lectureId);
    lecturePermissions.value = await sat.getLecturePermissions(
      authStore.authToken,
      lecture.lectureId,
    );

    showModal.value = true;

    if (route.name !== 'LectureDetail' || route.params.id !== lecture.lectureId) {
      router.push({
        name: 'LectureDetail',
        params: {id: lecture.lectureId},
      });
    }
  } catch (e) {
    error.value = e.message;
  }
};

const handleCloseDialog = () => {
  showModal.value = false;
  selectedLecture.value = null;

  // if (route.name === 'LectureDetail') {
  //   router.push({name: 'LectureList'});
  // }
};

// Watch for route changes to handle navigation
watch(
  () => route.params,
  newParams => {
    if (route.name === 'LectureDetail' && newParams.id) {
      const lectureId = newParams.id as string;
      if (!showModal.value || selectedLecture.value?.lectureId !== lectureId) {
        loadLectureById(lectureId);
      }
    }
  },
);

onBeforeRouteUpdate(() => {
  handleCloseDialog();
});
</script>
