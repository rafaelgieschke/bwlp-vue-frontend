<template>
  <header>
    <nav>
      <img class="small" src="@/assets/img/bwLogo/bwLehrpool_small.png" />
      <h6 class="max">BW Lehrpool</h6>
      <button
        v-if="mobile_nav"
        class="transparent circle small"
        data-ui="#mobile-navigation-dialog"
      >
        <i>close</i>
      </button>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const props = defineProps({
  mobile_nav: {
    type: Boolean,
    default: false,
  },
});
</script>
