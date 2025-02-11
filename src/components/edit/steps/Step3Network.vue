<template>
  <div class="step-network">
    <div class="field">
      <label class="switch">
        <input type="checkbox" v-model="modelValue.hasInternetAccess" />
        <span>Internet Access</span>
      </label>
    </div>
    <div class="field">
      <label class="switch">
        <input type="checkbox" v-model="modelValue.hasUsbAccess" />
        <span>USB Access</span>
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
