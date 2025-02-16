<template>
  <hr
    v-if="separator"
    class="small"
    :class="(separatorSize, onlyMobileClass)"
  />

  <!-- We use a Label despite it being a weird choice because this is how Beer CSS does it for some reason ¯\_(ツ)_/¯ -->
  <label :class="onlyMobileClass">{{ props.text }}</label>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  separator: {
    type: Boolean,
    default: true,
  },
  separatorSize: {
    type: String,
    default: 'small',
  },
  onlyMobileClass: {
    type: String,
    default: '',
  },
});
</script>
