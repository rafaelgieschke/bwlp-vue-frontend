<template>
  <div v-if="lecture">
    <table class="stripes">
      <tbody>
        <tr>
          <td>Beschreibung</td>
          <td colspan="3">{{ lecture.description }}</td>
        </tr>
        <tr>
          <td>Besitzer</td>
          <td colspan="3">{{ lecture.ownerId }}</td>
        </tr>
        <tr>
          <td>Erstellt am</td>
          <td colspan="3">
            {{ $dayjs(lecture.createTime * 1000).format('DD.MM.YYYY, HH:mm') }}
          </td>
        </tr>
        <tr>
          <td>Geändert am</td>
          <td>
            {{ $dayjs(lecture.updateTime * 1000).format('DD.MM.YYYY, HH:mm') }}
          </td>
          <td>durch</td>
          <td>{{ lecture.updaterId }}</td>
        </tr>
        <tr>
          <td>Betriebssystem</td>
          <td colspan="3">{{ lecture.osId }}</td>
        </tr>
        <tr>
          <td>Freigabemodus</td>
          <td colspan="2">{{ lecture.shareMode }}</td>
          <td>
            <label class="checkbox">
              <input type="checkbox" :checked="lecture.isShared" disabled />
              <span>Vorlage</span>
            </label>
          </td>
        </tr>
        <tr>
          <td>Versions-ID</td>
          <td colspan="3">{{ lecture.latestVersionId }}</td>
        </tr>
        <tr>
          <td>VM-ID</td>
          <td colspan="3">{{ lecture.lectureBaseId }}</td>
        </tr>
        <tr>
          <td>Virtualisierer</td>
          <td colspan="3">{{ lecture.virtId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
