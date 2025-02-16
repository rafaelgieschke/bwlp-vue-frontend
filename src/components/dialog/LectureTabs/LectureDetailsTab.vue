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
          <td><strong>durch</strong></td>
          <td>{{ lecture.updaterId }}</td>
        </tr>
        <tr>
          <td>Verknüpfte VM</td>
          <td colspan="3">{{ lecture.imageVersionId }}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td colspan="3">{{ lecture.lectureId }}</td>
        </tr>
        <tr>
          <td>Startdatum</td>
          <td colspan="3">
            {{ $dayjs(lecture.startTime * 1000).format('DD.MM.YYYY, HH:mm') }}
          </td>
        </tr>
        <tr>
          <td>Enddatum</td>
          <td colspan="2">
            {{ $dayjs(lecture.endTime * 1000).format('DD.MM.YYYY, HH:mm') }}
          </td>
          <td>
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="lecture.isEnabled"
                :id="`event_is_active-${lecture.lectureId}`"
                :name="`event_is_active-${lecture.lectureId}`"
                disabled
              />
              <span>Veranstaltung aktiv</span>
            </label>
          </td>
        </tr>
        <tr>
          <td>VM-Version</td>
          <td colspan="3">
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="lecture.autoUpdate"
                :id="`always_use_latest-${lecture.lectureId}`"
                :name="`always_use_latest-${lecture.lectureId}`"
                disabled
              />
              <span>Immer aktuellste Version verwenden</span>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
