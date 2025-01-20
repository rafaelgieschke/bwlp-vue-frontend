<template>
  <div v-if="image">
    <table class="stripes">
      <tbody>
        <tr>
          <td>Beschreibung</td>
          <td colspan="3">{{ image.description }}</td>
        </tr>
        <tr>
          <td>Besitzer</td>
          <td colspan="3">{{ image.ownerId }}</td>
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
          <td>{{ image.updaterId }}</td>
        </tr>
        <tr>
          <td>Betriebssystem</td>
          <td colspan="3">{{ image.osId }}</td>
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

<script setup>
defineProps({
  image: {
    type: Object,
    required: true,
  },
});
</script>
