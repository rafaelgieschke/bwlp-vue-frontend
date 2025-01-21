<template>
  <hr v-if="separator" :class="separator_size" />

  <!-- We use a Label despite it being a weird choice because this is how Beer CSS does it for some reason ¯\_(ツ)_/¯ -->
  <label>{{ props.text }}</label>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  separator: {
    type: Boolean,
    default: true,
  },
  separator_size: {
    type: String,
    default: 'small',
  },
});
</script>
