<template>
  <nav class="m l left drawer">
    <header>
      <nav>
        <img class="circle" src="@/assets/img/leopardskin.jpg" />
        <h6>BW Lehrpool</h6>
      </nav>
    </header>
    <RouterLink to="/image-list">
      <i>inbox</i>
      <span class="max">Image List</span>
    </RouterLink>
    <RouterLink to="/lecture-list">
      <i>send</i>
      <span>Lecture List</span>
    </RouterLink>

    <hr class="small" />

    <label>Labels</label>
    <RouterLink to="/privacy-policy">
      <i>favorite</i>
      <span>Datenschutzerklärung</span>
    </RouterLink>
    <RouterLink to="/user-agreement">
      <i>delete</i>
      <span>Nutzungsvereinbarung</span>
    </RouterLink>
  </nav>
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
