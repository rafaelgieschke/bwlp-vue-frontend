<template>
  <mdui-dialog
    v-if="isOpen"
    class="modal-overlay"
    @click="closeOnBackdrop && $emit('close')"
  >
    <mdui-top-app-bar slot="header">
      <mdui-top-app-bar-title>{{ title }}</mdui-top-app-bar-title>
      <mdui-button-icon @click="$emit('close')"
        ><mdui-icon-close--rounded></mdui-icon-close--rounded
      ></mdui-button-icon>
    </mdui-top-app-bar>
    <div class="modal-content" @click.stop>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </mdui-dialog>
</template>

<script setup>
import '@mdui/icons/close--rounded.js';

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  display: flex;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-body {
  overflow-y: auto;
}
</style>
