<template>
  <div class="field middle-align">
    <nav>
      <div class="max">
        <h6>{{ title }}</h6>
        <div v-if="description">{{ description }}</div>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="modelValue.isExam" />
        <span></span>
      </label>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});
</script>
