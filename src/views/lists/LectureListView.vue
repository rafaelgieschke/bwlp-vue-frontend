<template>
  <p v-if="error" class="error-message">{{ error }}</p>

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
    :is-open="showModal"
    :tabs="[
      {
        id: 'details',
        icon: 'info',
        label: 'Allgemein',
        component: LectureDetailsTab,
        props: {lecture: selectedLecture},
      },
      {
        id: 'restrictions',
        icon: 'info',
        label: 'Beschränkungen',
        component: LectureRestrictionsTab,
        props: {lecture: selectedLecture},
      },
      {
        id: 'firewall',
        icon: 'info',
        label: 'Firewall',
        component: LectureFirewallTab,
        props: {lecture: selectedLecture},
      },
      {
        id: 'room-selection',
        icon: 'info',
        label: 'Raumauswahl',
        component: LectureRoomSelectionTab,
        props: {lecture: selectedLecture, locations: lectureLocations},
      },
      {
        id: 'vm-start',
        icon: 'info',
        label: 'VM-Start',
        component: LectureVMStartTab,
        props: {lecture: selectedLecture},
      },
      {
        id: 'permissions',
        icon: 'lock',
        label: 'Berechtigungen',
        component: ImageLecturePermissionsTab,
        props: {
          permissions: lecturePermissions,
          defaultPermissions: selectedLecture?.defaultPermissions,
        },
      },
      {
        id: 'network-drives',
        icon: 'info',
        label: 'Netzlaufwerke',
        component: LectureNetworkDrivesTab,
        props: {lecture: selectedLecture},
      },
      {
        id: 'ldap-filter',
        icon: 'info',
        label: 'LDAP-Filter',
        component: LectureLDAPFilterTab,
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
    @close="showModal = false"
  />
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
import LectureRestrictionsTab from '@/components/dialog/LectureTabs/LectureRestrictionsTab.vue';
import LectureFirewallTab from '@/components/dialog/LectureTabs/LectureFirewallTab.vue';
import LectureRoomSelectionTab from '@/components/dialog/LectureTabs/LectureRoomSelectionTab.vue';
import LectureVMStartTab from '@/components/dialog/LectureTabs/LectureVMStartTab.vue';
import LectureNetworkDrivesTab from '@/components/dialog/LectureTabs/LectureNetworkDrivesTab.vue';
import LectureLDAPFilterTab from '@/components/dialog/LectureTabs/LectureLDAPFilterTab.vue';
import LectureTooManyDetailsTab from '@/components/dialog/LectureTabs/LectureTooManyDetailsTab.vue';
import ImageLecturePermissionsTab from '@/components/dialog/ImageLecturePermissionsTab.vue';

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
