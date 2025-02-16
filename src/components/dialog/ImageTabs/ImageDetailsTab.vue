<template>
  <div v-if="image">
    <!-- there seems to be an issue with the table? maybe? so TODO: -->
    <!-- Possibly to do with Betriebssystem -->
    <table class="stripes">
      <tbody>
        <tr>
          <td>Beschreibung</td>
          <td colspan="3">{{ image.description }}</td>
        </tr>
        <tr>
          <td>Besitzer</td>
          <td colspan="3">{{ ownerName }}</td>
        </tr>
        <tr>
          <td>Erstellt am</td>
          <td colspan="3">
            {{ $dayjs(image.createTime * 1000).format('DD.MM.YYYY, HH:mm') }}
          </td>
        </tr>
        <tr>
          <td>Geändert am</td>
          <td>
            {{ $dayjs(image.updateTime * 1000).format('DD.MM.YYYY, HH:mm') }}
          </td>
          <td><strong>durch</strong></td>
          <td>{{ updaterName }}</td>
        </tr>
        <tr>
          <td>Betriebssystem</td>
          <td colspan="3">{{ image.versions[0].versionId }}</td>
        </tr>
        <tr>
          <td>Freigabemodus</td>
          <td colspan="2">{{ image.shareMode }}</td>
          <td>
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="image.isShared"
                :id="`image_is_shared-${image.imageBaseId}`"
                :name="`image_is_shared-${image.imageBaseId}`"
                disabled
              />
              <span>Vorlage</span>
            </label>
          </td>
        </tr>
        <tr>
          <td>Versions-ID</td>
          <td colspan="3">{{ image.latestVersionId }}</td>
        </tr>
        <tr>
          <td>VM-ID</td>
          <td colspan="3">{{ image.imageBaseId }}</td>
        </tr>
        <tr>
          <td>Virtualisierer</td>
          <td colspan="3">{{ image.virtId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch, onMounted} from '@vue/runtime-core';

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
});

const ownerName = ref('');
const updaterName = ref('');

import {useUsers} from '@/composables/useUsers';

const {fetchUsers, getUserFullName} = useUsers();

const refreshUserDetails = () => {
  getOwnerName();
  getUpdaterName();
};

watch(
  () => props.image,
  newValue => {
    if (newValue) {
      refreshUserDetails();
    }
  },
  {immediate: false},
);

onMounted(() => {
  refreshUserDetails();
});

const getOwnerName = async () => {
  await fetchUsers();
  ownerName.value = getUserFullName(props.image.ownerId);
};

const getUpdaterName = async () => {
  await fetchUsers();
  updaterName.value = getUserFullName(props.image.updaterId);
};
</script>
