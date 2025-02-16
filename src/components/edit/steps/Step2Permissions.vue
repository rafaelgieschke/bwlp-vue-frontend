<template>
  <div class="step-permissions">
    <SwitchTitle
      title="Enabled"
      :modelValue="modelValue.isEnabled"
      @update:modelValue="updateField('isEnabled', $event)"
    />
    <SwitchTitle
      title="Exam mode"
      :modelValue="modelValue.isExam"
      @update:modelValue="updateField('isExam', $event)"
    />
    <SwitchTitle
      title="Allow edit"
      description="Can users edit the lecture?"
      :modelValue="modelValue.defaultPermissions"
      @update:modelValue="updateField('defaultPermissions', $event)"
    />
    <SwitchTitle
      title="Allow admin"
      description="Can admins edit the lecture?"
      :modelValue="modelValue.adminPermissions"
      @update:modelValue="updateField('adminPermissions', $event)"
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
