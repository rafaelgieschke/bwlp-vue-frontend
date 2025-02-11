<template>
  <div class="step-network">
    <SwitchTitle
      title="Internet Access"
      :modelValue="modelValue.hasInternetAccess"
      @update:modelValue="updateField('hasInternetAccess', $event)"
    />

    <SwitchTitle
      title="USB Access"
      :modelValue="modelValue.hasUsbAccess"
      @update:modelValue="updateField('hasUsbAccess', $event)"
    />
  </div>
</template>

<script setup>
import SwitchTitle from '@/components/edit/steps/SwitchTitle.vue';

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
