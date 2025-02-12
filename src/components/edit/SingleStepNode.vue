<template>
  <div class="center-align">
    <button
      type="button"
      @click="currentStep = stepNumber"
      class="circle small"
    >
      <i v-if="currentStep > stepNumber">done</i>
      <div v-else="currentStep === stepNumber">
        {{ stepNumber }}
      </div>
    </button>

    <div class="small-margin">{{ text }}</div>
  </div>
</template>

<script setup>
const currentStep = defineModel('currentStep', {required: true});

defineProps({
  stepNumber: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    default: '',
  },
});
</script>
