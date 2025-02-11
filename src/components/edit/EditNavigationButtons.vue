<template>
  <div class="buttons">
    <button
      type="button"
      class="no-margin border secondary-border"
      @click="prevStep"
      :disabled="currentStep <= 1"
    >
      <i>arrow_back</i>
      <span>Previous</span>
    </button>

    <button
      type="button"
      class="no-margin border primary-border"
      @click="nextStep"
      :disabled="currentStep >= 4"
    >
      <span>Next</span>
      <i>arrow_forward</i>
    </button>

    <button type="submit" class="primary">
      <i>save</i>
      <span>Save</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  prevStep: {
    type: Function,
    required: true,
  },
  nextStep: {
    type: Function,
    required: true,
  },
});

const currentStep = defineModel('currentStep', {required: true});
</script>

<style scoped>
.buttons {
  display: flex;
  gap: 1rem;
}
</style>
