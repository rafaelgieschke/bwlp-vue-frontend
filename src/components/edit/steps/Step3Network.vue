<template>
  <div class="step-network">
    <SwitchTitle
      title="Internet Access"
      :modelValue="modelValue.hasInternetAccess"
    />

    <SwitchTitle title="USB Access" :modelValue="modelValue.hasUsbAccess" />
  </div>
</template>

<script setup>
import SwitchTitle from '@/components/edit/steps/SwitchTitle.vue';

defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

defineEmits(['update:modelValue']);
</script>
