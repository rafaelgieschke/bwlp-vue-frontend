<template>
  <section class="grid large-space">
    <section class="bottom-margin medium-height surface scroll s12 l6">
      <LocationTreeItem
        v-for="location in locationsTree"
        :key="location.id"
        :location="location"
      />
    </section>

    <section class="s12 l6">
      <div>
        <label class="radio">
          <input type="radio" name="exclusive_priority_radio" disabled />
          <span class="wrap">
            Veranstaltung ausschließlich in den ausgewählten Räumen anzeigen
          </span>
        </label>
      </div>
      <div>
        <label class="radio">
          <input type="radio" name="exclusive_priority_radio" disabled />
          <span class="wrap">
            Veranstaltung mit höherer Priorität in den ausgewählten Räumen
            anzeigen
          </span>
        </label>
      </div>
    </section>
  </section>
</template>

<script setup>
import {computed} from 'vue';
import LocationTreeItem from '@/components/dialog/LectureTabs/TabsComponents/LocationTreeItem.vue';

const props = defineProps({
  lecture: {
    type: Object,
    required: true,
  },
  locations: {
    type: Object,
    required: true,
  },
});

const locationsTree = computed(() => {
  const tree = {};

  // First pass: Create all nodes
  Object.values(props.locations).forEach(location => {
    tree[location.locationId] = {
      ...location,
      children: [],
    };
  });

  // Second pass: Build parent-child relationships
  Object.values(tree).forEach(node => {
    if (node.parentLocationId && tree[node.parentLocationId]) {
      tree[node.parentLocationId].children.push(node);
    }
  });

  // Return only root nodes (nodes without parents)
  return Object.values(tree).filter(node => !node.parentLocationId);
});
</script>
