<template>
  <button data-ui="#dialog" class="s circle transparent">
    <i>menu</i>
  </button>
  <!-- Hide this when changing screen size -->
  <dialog id="dialog" class="left no-padding">
    <nav class="drawer">
      <NavigationHeader />
      <ListOfPages />
    </nav>
  </dialog>
</template>

<script setup>
import ListOfPages from '@/components/navigation/ListOfPages.vue';
import NavigationHeader from '@/components/navigation/NavigationHeader.vue';
</script>
