<template>
  <RouterLink
    to="/image"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>inbox</i>
    <span class="max">Image List</span>
  </RouterLink>
  <RouterLink
    to="/lecture"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>send</i>
    <span>Lecture List</span>
  </RouterLink>

  <SeparatingLabel text="Legal stuff" />
  <RouterLink
    to="/privacy-policy"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>policy</i>
    <span>Datenschutzerklärung</span>
  </RouterLink>
  <RouterLink
    to="/user-agreement"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>handshake</i>
    <span>Nutzungsvereinbarung</span>
  </RouterLink>

  <SeparatingLabel text="Miscellaneous" />
  <a
    href="https://www.bwlehrpool.de/wiki/doku.php/start"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>developer_guide</i>
    <span>bwLehrpool Wiki</span>
  </a>
</template>

<script setup>
import {RouterLink} from 'vue-router';
import SeparatingLabel from '@/components/navigation/SeparatingLabel.vue';

const props = defineProps({
  mobile_nav: {
    type: Boolean,
    default: false,
  },
});
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
