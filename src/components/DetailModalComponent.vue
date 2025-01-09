<template>
  <section
    v-if="isOpen"
    class="modal-overlay"
    @click="closeOnBackdrop && $emit('close')"
  >
    <section slot="header">
      <h1>{{ title }}</h1>
      <button @click="$emit('close')">CLOSE MOTHERFUCKER</button>
    </section>
    <div class="modal-content" @click.stop>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </section>
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
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-body {
  overflow-y: auto;
}
</style>
