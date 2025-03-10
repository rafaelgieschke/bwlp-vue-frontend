<template>
  <div class="step-network">
    <SwitchTitle title="Internet Access" v-model="formData.hasInternetAccess" />

    <SwitchTitle title="USB Access" v-model="formData.hasUsbAccess" />
  </div>
</template>

<script setup>
import SwitchTitle from '@/components/edit/steps/SwitchTitle.vue';

defineModel({
  formData: {
    type: Object,
    required: true,
  },
});
</script>
