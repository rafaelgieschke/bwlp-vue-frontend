<template>
  <div class="step-advanced">
    <SwitchTitle
      title="Auto Update"
      description="Should the lecture auto update?"
      v-model="modelValue.autoUpdate"
    />

    <SwitchTitle
      title="Limit to Locations"
      description="Should the lecture be limited to locations?"
      v-model="modelValue.limitToLocations"
    />
  </div>
</template>

<script setup>
import SwitchTitle from '@/components/edit/steps/SwitchTitle.vue';

defineModel({
  modelValue: {
    type: Object,
    required: true,
  },
});
</script>
