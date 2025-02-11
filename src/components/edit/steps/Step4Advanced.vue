<template>
  <div class="step-advanced">
    <div class="field">
      <label class="switch">
        <input type="checkbox" v-model="modelValue.autoUpdate" />
        <span>Auto Update</span>
      </label>
    </div>

    <div class="field">
      <label class="switch">
        <input type="checkbox" v-model="modelValue.limitToLocations" />
        <span>Limit to Locations</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

defineEmits(['update:modelValue']);
</script>
