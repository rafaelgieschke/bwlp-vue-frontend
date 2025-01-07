<template>
  <mdui-dialog
    v-if="isOpen"
    class="modal-overlay"
    @click="closeOnBackdrop && $emit('close')"
  >
    <div class="modal-content" @click.stop>
      <header class="modal-header">
        <h3>
          <slot name="header">{{ title }}</slot>
        </h3>
      </header>

      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </mdui-dialog>
</template>

<script setup>
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
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-body {
  overflow-y: auto;
}
</style>
