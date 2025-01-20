<template>
  <RouterLink to="/image-list">
    <i>inbox</i>
    <span class="max">Image List</span>
  </RouterLink>
  <RouterLink to="/lecture-list">
    <i>send</i>
    <span>Lecture List</span>
  </RouterLink>

  <hr class="small" />

  <!-- We use a Label despite it being a weird choice because this is how Beer CSS does it for some reason ¯\_(ツ)_/¯ -->
  <label>Legal Bullshit</label>
  <RouterLink to="/privacy-policy">
    <i>policy</i>
    <span>Datenschutzerklärung</span>
  </RouterLink>
  <RouterLink to="/user-agreement">
    <i>handshake</i>
    <span>Nutzungsvereinbarung</span>
  </RouterLink>
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
