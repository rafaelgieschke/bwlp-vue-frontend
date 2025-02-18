<template>
  <div class="step-permissions">
    <SwitchTitle title="Enabled" v-model="modelValue.isEnabled" />
    <SwitchTitle title="Exam mode" v-model="modelValue.isExam" />
    <SwitchTitle
      title="Allow edit"
      description="Can users edit the lecture?"
      v-model="modelValue.defaultPermissions"
    />
    <SwitchTitle
      title="Allow admin"
      description="Can admins edit the lecture?"
      v-model="modelValue.adminPermissions"
    />
  </div>
</template>

<script setup>
import SwitchTitle from '@/components/edit/steps/SwitchTitle.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    validator: value => {
      return [
        'isEnabled',
        'isExam',
        'defaultPermissions',
        'adminPermissions',
      ].every(key => typeof value[key] === 'boolean');
    },
  },
});

const emit = defineEmits(['update:modelValue']);
</script>
