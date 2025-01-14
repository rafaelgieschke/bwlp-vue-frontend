<template>
  <div v-if="lecture">
    Temporary tab just to show the lecture object:
    <pre class="scroll">{{ JSON.stringify(lecture, null, 2) }}</pre>
  </div>
</template>

<script setup>
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
