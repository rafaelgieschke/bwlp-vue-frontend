<template>
  <template v-if="$route.name === 'LectureList'">
    <ErrorMessage
      v-if="error"
      :error="error"
      default-message="There's been an error of some kind"
    />

    <SortableTable
      v-if="lectureList.length > 0"
      :items="lectureList"
      :columns="columns"
      item-key="lectureId"
      item-label="lectures"
      @row-click="openModal"
    />

    <DetailDialog
      v-if="selectedLecture"
      id="lecture-dialog"
      :title="selectedLecture?.lectureName"
      :editRoute="{
        name: 'LectureEdit',
        params: {id: selectedLecture?.lectureId},
      }"
      :is-open="showModal"
      :tabs="
        lectureTabs.map(tab => ({
          ...tab,
          props: tab.props(
            selectedLecture,
            lectureLocations,
            lecturePermissions,
          ),
        }))
      "
      @close-wanted="showModal = false"
    />
  </template>

  <template v-if="$route.name === 'LectureEdit'">
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

// #region Tabs
import DetailDialog from '@/components/dialog/DetailDialog.vue';
import LectureDetailsTab from '@/components/dialog/LectureTabs/LectureDetailsTab.vue';
import LectureRestrictionsTab from '@/components/dialog/LectureTabs/LectureRestrictionsTab.vue';
import LectureFirewallTab from '@/components/dialog/LectureTabs/LectureFirewallTab.vue';
import LectureRoomSelectionTab from '@/components/dialog/LectureTabs/LectureRoomSelectionTab.vue';
import LectureVMStartTab from '@/components/dialog/LectureTabs/LectureVMStartTab.vue';
import LectureNetworkDrivesTab from '@/components/dialog/LectureTabs/LectureNetworkDrivesTab.vue';
import LectureLDAPFilterTab from '@/components/dialog/LectureTabs/LectureLDAPFilterTab.vue';
import LectureTooManyDetailsTab from '@/components/dialog/LectureTabs/LectureTooManyDetailsTab.vue';
import ImageLecturePermissionsTab from '@/components/dialog/ImageLecturePermissionsTab.vue';

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
    props: (lecture, lecturePermissions) => ({
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
  {
    id: 'TooManyDetails',
    icon: 'info',
    label: 'TooManyDetails',
    component: LectureTooManyDetailsTab,
    props: lecture => ({lecture}),
  },
];
// #endregion Tabs

const router = useRouter();
const authStore = useAuthStore();

// const sat1Server = 'bwlp-pxe.ruf.uni-freiburg.de';
const sat1Server = '10.4.9.57';

const proto2 = new Thrift.Protocol(
  new Thrift.Transport(`https://${sat1Server}/thrift/`),
);
const sat = new SatelliteServerClient(proto2);

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
    lectureLocations.value = await sat.getLocations(
      authStore.authToken,
      lecture.lectureId,
    );
    lecturePermissions.value = await sat.getLecturePermissions(
      authStore.authToken,
      lecture.lectureId,
    );

    showModal.value = true;
  } catch (e) {
    error.value = e.message;
  }
};
</script>
