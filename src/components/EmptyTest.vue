<template>
  {{ props.text }}
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: 'A Test Component',
  },
});
</script>
