<template>
  <nav class="m l left drawer">
    <NavigationHeader />
    <ListOfPages />
  </nav>
</template>

<script lang="ts" setup>
import ListOfPages from '@/components/navigation/ListOfPages.vue';
import NavigationHeader from '@/components/navigation/NavigationHeader.vue';
</script>
