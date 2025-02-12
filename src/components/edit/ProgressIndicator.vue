<template>
  <nav>
    <SingleStepNode
      v-for="index in 4"
      v-model:currentStep="currentStep"
      :step-number="index"
    />
  </nav>
</template>

<script setup>
import SingleStepNode from '@/components/edit/SingleStepNode.vue';

const currentStep = defineModel('currentStep', {required: true});
</script>
