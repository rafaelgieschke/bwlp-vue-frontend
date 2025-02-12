<template>
  <div class="center-align">
    <button @click.prevent="currentStep = stepNumber" class="circle small">
      <i v-if="currentStep > stepNumber">done</i>
      <div v-else="currentStep === stepNumber">
        {{ stepNumber }}
      </div>
    </button>

    <div v-if="currentStep > stepNumber" class="small-margin">Previous</div>
    <div v-if="currentStep === stepNumber" class="small-margin">Current</div>
    <div v-if="currentStep < stepNumber" class="small-margin">Next</div>
  </div>

  <hr v-if="stepNumber < 4" class="max" />
</template>

<script setup>
const currentStep = defineModel('currentStep', {required: true});
const props = defineProps({
  stepNumber: {
    type: Number,
    required: true,
  },
});
</script>
