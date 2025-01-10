<template>
  <Navigation />
  <HeaderComponent />

  <main class="responsive">
    <router-view></router-view>
  </main>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>
