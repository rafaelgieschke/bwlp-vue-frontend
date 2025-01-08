<template>
  <mdui-list>
    <RouterLink to="/image-list">
      <mdui-list-item>Image List</mdui-list-item>
    </RouterLink>
    <RouterLink to="/lecture-list">
      <mdui-list-item>Lecture List</mdui-list-item>
    </RouterLink>

    <RouterLink to="/privacy-policy">
      <mdui-list-item>Datenschutzerklärung</mdui-list-item>
    </RouterLink>
    <RouterLink to="/user-agreement">
      <mdui-list-item>Nutzungsvereinbarung</mdui-list-item>
    </RouterLink>
  </mdui-list>
</template>

<script setup>
import {RouterLink} from 'vue-router';
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
