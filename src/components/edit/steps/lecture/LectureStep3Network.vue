<template>
  <div class="step-network">
    <SwitchTitle
      title="Internet Access"
      v-model="modelValue.hasInternetAccess"
    />

    <SwitchTitle title="USB Access" v-model="modelValue.hasUsbAccess" />
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
