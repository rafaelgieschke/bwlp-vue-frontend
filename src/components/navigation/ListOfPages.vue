<template>
  <RouterLink
    class="wave"
    to="/image"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>aspect_ratio</i>
    <span class="max">{{ $t('imageList') }}</span>
  </RouterLink>
  <RouterLink
    class="wave"
    to="/lecture"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>school</i>
    <span>{{ $t('lectureList') }}</span>
  </RouterLink>

  <SeparatingLabel :text="$t('legalStuff')" />
  <RouterLink
    class="wave"
    to="/privacy-policy"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>policy</i>
    <span>{{ $t('privacyPolicy') }}</span>
  </RouterLink>
  <RouterLink
    class="wave"
    to="/user-agreement"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>handshake</i>
    <span>{{ $t('userAgreement.title') }}</span>
  </RouterLink>

  <SeparatingLabel :text="$t('miscellaneous')" />
  <a
    class="wave"
    href="https://www.bwlehrpool.de/wiki/doku.php/start"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>developer_guide</i>
    <span>bwLehrpool Wiki</span>
  </a>
  <a
    v-if="showGithub"
    class="wave"
    href="https://github.com/Khoding/bwlp-vue-frontend"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>code</i>
    <span>BWLP Vue Frontend Repository</span>
  </a>
</template>

<script setup>
import {ref} from 'vue';
import {RouterLink} from 'vue-router';
import SeparatingLabel from '@/components/navigation/SeparatingLabel.vue';

const showGithub = ref(import.meta.env.VITE_SHOW_GITHUB === 'true');

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
