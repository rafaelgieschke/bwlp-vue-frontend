<template>
  <div class="step-advanced">
    <SwitchTitle
      title="Auto Update"
      description="Should the lecture auto update?"
      :modelValue="modelValue.autoUpdate"
      @update:modelValue="updateField('autoUpdate', $event)"
    />

    <SwitchTitle
      title="Limit to Locations"
      description="Should the lecture be limited to locations?"
      :modelValue="modelValue.limitToLocations"
      @update:modelValue="updateField('limitToLocations', $event)"
    />
  </div>
</template>

<script setup>
import SwitchTitle from './SwitchTitle.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateField = (field, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  });
};
</script>
