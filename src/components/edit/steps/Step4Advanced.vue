<template>
  <div class="step-advanced">
    <SwitchTitle
      title="Auto Update"
      description="Should the lecture auto update?"
      :modelValue="modelValue.autoUpdate"
    />

    <SwitchTitle
      title="Limit to Locations"
      description="Should the lecture be limited to locations?"
      :modelValue="modelValue.limitToLocations"
    />
  </div>
</template>

<script setup>
import SwitchTitle from './SwitchTitle.vue';

defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

defineEmits(['update:modelValue']);
</script>
