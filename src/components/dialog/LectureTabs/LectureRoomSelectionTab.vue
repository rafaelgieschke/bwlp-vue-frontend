<template>
  <div>This tab needs work</div>
  <div>
    if anyone understands the original code, that would really help lmao, that
    shit's NASTY
  </div>
  <div class="medium-height surface scroll">
    <div v-for="(location, index) in locations">
      <label class="checkbox">
        <input
          type="checkbox"
          :id="`location-${index}-${location.locationName}`"
          :name="`location-${index}-${location.locationName}`"
          disabled
        />
        <span>{{ location.locationName }}</span>
      </label>
    </div>
  </div>

  <div>
    <label class="radio">
      <!-- TODO: Give another name (radio1_ isn't good enough) -->
      <input type="radio" name="radio1_" />
      <span>
        Veranstaltung ausschließlich in den ausgewählten Räumen anzeigen
      </span>
    </label>
  </div>

  <div>
    <label class="radio">
      <input type="radio" name="radio1_" />
      <span>
        Veranstaltung mit höherer Priorität in den ausgewählten Räumen anzeigen
      </span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
  locations: {
    type: Object,
    required: true,
  },
});
</script>
