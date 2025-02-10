<template>
  <div class="top-margin bottom-margin left-margin">
    <details v-if="location.children?.length > 0">
      <summary>{{ location.locationName }}</summary>
      <div class="left-margin">
        <LocationTreeItem
          v-for="child in location.children"
          :key="child.id"
          :location="child"
          class="top-margin bottom-margin"
        />
      </div>
    </details>
    <p v-else>{{ location.locationName }}</p>
  </div>
</template>

<script setup>
defineProps({
  location: {
    type: Object,
    required: true,
  },
});
</script>
