<template>
  <button
    data-ui="#mobile-navigation-dialog"
    id="mobile-navigation-dialog-button"
    class="s circle transparent"
  >
    <i>menu</i>
  </button>
  <dialog id="mobile-navigation-dialog" class="left no-padding">
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

<style scoped>
@media (min-width: 601px) {
  #mobile-navigation-dialog.active,
  :global([data-ui='#mobile-navigation-dialog'].active + .overlay.active) {
    display: none;
  }
}
</style>
