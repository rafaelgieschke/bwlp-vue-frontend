<template>
  <div class="step-permissions">
    <SwitchTitle title="Enabled" v-model="modelValue.isEnabled" />
    <SwitchTitle title="Exam mode" v-model="modelValue.isExam" />

    <SwitchTitle
      title="Default edit permission"
      description="Can users edit the lecture?"
      v-model="permissions.edit"
    />
    <SwitchTitle
      title="Default admin permission"
      description="Can admins edit the lecture?"
      v-model="permissions.admin"
    />
  </div>
</template>

<script setup>
import {computed} from 'vue';

import SwitchTitle from '@/components/edit/steps/SwitchTitle.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const permissions = computed(() => {
  return props.modelValue.defaultPermissions || {edit: false, admin: false};
});

const emit = defineEmits(['update:modelValue']);
</script>
