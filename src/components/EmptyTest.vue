<template>
  {{ props.text }}
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'A Test Component',
  },
});
</script>
