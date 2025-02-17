<template>
  <div class="step-permissions">
    <SwitchTitle
      title="Enabled"
      :model-value="modelValue.isEnabled"
      @update:model-value="updateField('isEnabled', $event)"
    />
    <SwitchTitle
      title="Exam mode"
      :model-value="modelValue.isExam"
      @update:model-value="updateField('isExam', $event)"
    />
    <SwitchTitle
      title="Allow edit"
      description="Can users edit the lecture?"
      :model-value="modelValue.defaultPermissions"
      @update:model-value="updateField('defaultPermissions', $event)"
    />
    <SwitchTitle
      title="Allow admin"
      description="Can admins edit the lecture?"
      :model-value="modelValue.adminPermissions"
      @update:model-value="updateField('adminPermissions', $event)"
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

const updateField = (field, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  });
};
</script>
