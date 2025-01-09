<template>
  <dialog class="medium">
    <header class="border-bottom">
      <nav>
        <h5>{{ title }}</h5>
        <button class="transparent circle small" @click="closeDialog">
          <i>close</i>
        </button>
      </nav>
    </header>

    <article class="medium padding">
      <slot></slot>
    </article>

    <footer class="border-top right-align">
      <button class="border" @click="closeDialog">Close</button>
    </footer>
  </dialog>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);

const closeDialog = () => {
  const dialog = document.querySelector('dialog');
  dialog.close();
  emit('close');
};
</script>
