<template>
  <div v-if="image" class="surface auto-height scroll">
    <table class="stripes">
      <thead>
        <tr>
          <th>Data</th>
          <th colspan="3">Value</th>
        </tr>
      </thead>
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
            {{ formatDate(image.createTime * 1000, 'DD.MM.YYYY, HH:mm') }}
          </td>
        </tr>
        <tr>
          <td>Geändert am</td>
          <td>
            {{ formatDate(image.updateTime * 1000, 'DD.MM.YYYY, HH:mm') }}
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
          <td>Latest version ID</td>
          <td colspan="2">{{ image.latestVersionId || 'Expired' }}</td>
          <td>
            <a :href="image.versions[image.versions.length - 1].imagePath"
              >Link to elephant 🐘's situation (idke)</a
            >
          </td>
        </tr>
        <tr>
          <td>VM-ID</td>
          <td colspan="3">{{ image.imageBaseId }}</td>
        </tr>
        <tr>
          <td>Virtualisierer</td>
          <td colspan="3">
            {{ image.virtId }}

            <VirtLogo :virt="image.virtId" :display-tooltip="false" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onMounted} from '@vue/runtime-core';
import {useDateFormat} from '@vueuse/core';

import VirtLogo from '@/components/VirtLogo.vue';

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

const formatDate = (timestamp: number, format: string) => {
  return useDateFormat(timestamp, format).value;
};

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
