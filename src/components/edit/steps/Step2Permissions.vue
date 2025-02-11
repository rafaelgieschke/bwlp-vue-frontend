<template>
  <div class="step-permissions">
    <SwitchTitle title="Enabled" :modelValue="modelValue.isEnabled" />
    <SwitchTitle title="Exam mode" :modelValue="modelValue.isExam" />
    <SwitchTitle
      title="Allow edit"
      description="Can users edit the lecture?"
      :modelValue="modelValue.defaultPermissions"
    />
    <SwitchTitle
      title="Allow admin"
      description="Can admins edit the lecture?"
      :modelValue="modelValue.defaultPermissions"
    />
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
