<template>
  <nav class="bottom-margin">
    <div class="tabs">
      <a :class="{active: currentStep === 1}" @click="currentStep = 1">
        <i>info</i>Basic Info
      </a>
      <a :class="{active: currentStep === 2}" @click="currentStep = 2">
        <i>key</i>Permissions
      </a>
      <a :class="{active: currentStep === 3}" @click="currentStep = 3">
        <i>wifi</i>Network
      </a>
      <a :class="{active: currentStep === 4}" @click="currentStep = 4">
        <i>settings</i>Advanced
      </a>
    </div>
  </nav>
</template>

<script setup>
const currentStep = defineModel('currentStep', {required: true});
</script>
