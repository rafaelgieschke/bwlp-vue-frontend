<template>
  <div v-if="versions" class="auto-height surface scroll">
    <table class="stripes">
      <thead class="fixed">
        <tr>
          <th>Erstellungszeitpunkt</th>
          <th>Ablaufszeitpunkt</th>
          <th>Ersteller</th>
          <th>Verwendbar</th>
          <th>Größe</th>
          <th>Interne ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(version, index) in versions" :key="version.versionId">
          <td>
            {{ $dayjs(version.createTime * 1000).format('DD.MM.YYYY, HH:mm') }}
          </td>
          <td>
            {{ $dayjs(version.expireTime * 1000).format('DD.MM.YYYY, HH:mm') }}
          </td>
          <td>{{ version.uploaderId }}</td>
          <td>
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="version.isRestricted"
                :id="`version-${version.versionId}-${index}`"
                :name="`version-${version.versionId}-${index}`"
                disabled
              />
              <span>{{
                version.isRestricted ? 'Verwendbar' : 'Nicht verwendbar'
              }}</span>
            </label>
          </td>
          <td>{{ humanFileSize(version.fileSize) }}</td>
          <td>{{ version.versionId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {humanFileSize} from '@/utils/fileSize';

defineProps({
  versions: {
    type: Array,
    required: true,
  },
});
</script>
