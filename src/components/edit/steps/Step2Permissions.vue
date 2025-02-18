<template>
  <div class="step-permissions">
    <SwitchTitle title="Enabled" v-model="modelValue.isEnabled" />
    <SwitchTitle title="Exam mode" v-model="modelValue.isExam" />
    <!-- TODO: Ask Simon what is supposed to happen here -->
    <!-- <SwitchTitle
      title="Allow edit"
      description="Can users edit the lecture?"
      v-model="modelValue.defaultPermissions"
    />
    <SwitchTitle
      title="Allow admin"
      description="Can admins edit the lecture?"
      v-model="modelValue.adminPermissions"
    /> -->
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
</script>
