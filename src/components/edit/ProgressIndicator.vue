<template>
  <nav>
    <SingleStepNode
      v-model:currentStep="currentStep"
      :step-number="1"
      text="Basic Info"
    />

    <hr class="max" />

    <SingleStepNode
      v-model:currentStep="currentStep"
      :step-number="2"
      text="Permissions"
    />

    <hr class="max" />

    <SingleStepNode
      v-model:currentStep="currentStep"
      :step-number="3"
      text="Network"
    />

    <hr class="max" />

    <SingleStepNode
      v-model:currentStep="currentStep"
      :step-number="4"
      text="Advanced"
    />
  </nav>
</template>

<script setup>
import SingleStepNode from '@/components/edit/SingleStepNode.vue';

const currentStep = defineModel('currentStep', {required: true});
</script>
