<template>
  <div class="step-permissions">
    <SwitchTitle title="Enabled" v-model="formData.isEnabled" />
    <SwitchTitle title="Exam mode" v-model="formData.isExam" />

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

const formData = defineModel({
  type: Object,
  required: true,
});

const permissions = computed(() => {
  return formData.value.defaultPermissions || {edit: false, admin: false};
});
</script>
