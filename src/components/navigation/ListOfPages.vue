<template>
  <RouterLink to="/image-list">
    <i>inbox</i>
    <span class="max">Image List</span>
  </RouterLink>
  <RouterLink to="/lecture-list">
    <i>send</i>
    <span>Lecture List</span>
  </RouterLink>

  <SeparatingLabel text="Legal Bullshit" />
  <RouterLink to="/privacy-policy">
    <i>policy</i>
    <span>Datenschutzerklärung</span>
  </RouterLink>
  <RouterLink to="/user-agreement">
    <i>handshake</i>
    <span>Nutzungsvereinbarung</span>
  </RouterLink>

  <SeparatingLabel text="Miscellaneous" />
  <a
    href="https://www.bwlehrpool.de/wiki/doku.php/start"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i>developer_guide</i>
    <span>bwLehrpool Wiki</span>
  </a>
</template>

<script setup>
import {RouterLink} from 'vue-router';
import SeparatingLabel from '@/components/navigation/SeparatingLabel.vue';
</script>

<style scoped>
.router-link-active {
  background-color: var(--primary);
  color: var(--on-primary);

  &:hover {
    color: var(--on-primary-container);
  }
}
</style>
