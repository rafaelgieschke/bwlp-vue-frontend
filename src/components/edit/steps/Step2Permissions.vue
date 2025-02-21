<template>
  <div class="step-permissions">
    <SwitchTitle title="Enabled" v-model="modelValue.isEnabled" />
    <SwitchTitle title="Exam mode" v-model="modelValue.isExam" />
    <!-- TODO: Ask Simon what is supposed to happen here -->
    <!-- <SwitchTitle
      title="Default edit"
      description="Can users edit the lecture?"
      v-model="modelValue.defaultPermissions.edit"
    />
    <SwitchTitle
      title="Default admin"
      description="Can admins edit the lecture?"
      v-model="modelValue.defaultPermissions.admin"
    />
    <SwitchTitle
      title="User edit"
      description="Can users edit the lecture?"
      v-model="modelValue.userPermissions.edit"
    />
    <SwitchTitle
      title="User admin"
      description="Can admins edit the lecture?"
      v-model="modelValue.userPermissions.admin"
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
