<template>
  <section class="top-margin bottom-margin location-item">
    <details v-if="location.children?.length > 0">
      <summary class="none">
        <article class="round border primary-border no-elevate">
          <nav>
            <div class="max">
              {{ location.locationName }}
            </div>

            <i>expand_more</i>
          </nav>
        </article>
      </summary>

      <div class="left-margin">
        <LocationTreeItem
          v-for="child in location.children"
          :key="child.id"
          :location="child"
          class="top-margin bottom-margin"
        />
      </div>
    </details>

    <article v-else class="round border middle-align">
      <label class="checkbox">
        <input type="checkbox" disabled />
        <span>{{ location.locationName }}</span>
      </label>
    </article>
  </section>
</template>

<script setup>
defineProps({
  location: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.location-item .location-item {
  margin-inline-start: 0.5rem;
}
</style>
