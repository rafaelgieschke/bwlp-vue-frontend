<template>
  <EmptyTest text="Not yet implemented" />
</template>

<script lang="ts" setup>
import EmptyTest from '@/components/EmptyTest.vue';

defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
