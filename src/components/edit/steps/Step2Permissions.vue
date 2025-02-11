<template>
  <div class="step-permissions">
    <div class="field">
      <label class="switch">
        <input type="checkbox" v-model="modelValue.isEnabled" />
        <span>Enabled</span>
      </label>
    </div>
    <div class="field">
      <label class="switch">
        <input type="checkbox" v-model="modelValue.isExam" />
        <span>Exam Mode</span>
      </label>
    </div>
    <div class="field">
      <label class="switch">
        <input type="checkbox" v-model="modelValue.defaultPermissions" />
        <span>Allow Edit</span>
      </label>
    </div>
    <div class="field">
      <label class="switch">
        <input type="checkbox" v-model="modelValue.defaultPermissions" />
        <span>Allow Admin</span>
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
