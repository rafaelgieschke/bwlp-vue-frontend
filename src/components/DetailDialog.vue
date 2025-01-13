<template>
  <dialog class="top">
    <header class="fixed">
      <nav>
        <h5 class="max">{{ title }}</h5>
        <button class="transparent circle small" @click="closeDialog">
          <i>close</i>
        </button>
      </nav>
    </header>

    <article class="scroll padding">
      <!-- TODO: rename the tabs and shit -->
      <div>
        <div class="tabs">
          <a data-ui="#page1" class="active">
            <i>home</i>
            <span>Tab 1</span>
          </a>
          <a data-ui="#page2">
            <i>home</i>
            <span>Tab 2</span>
          </a>
          <a data-ui="#page3">
            <i>home</i>
            <span>Tab 3</span>
          </a>
          <a data-ui="#page4">
            <i>home</i>
            <span>Tab 4</span>
          </a>
        </div>
        <div id="page1" class="page padding right active">
          <slot name="page1"></slot>
        </div>
        <div id="page2" class="page padding right">
          <slot name="page2"></slot>
        </div>
        <div id="page3" class="page padding right">
          <slot name="page3"></slot>
        </div>
        <div id="page4" class="page padding right">
          <slot name="page4"></slot>
        </div>
      </div>
    </article>
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

<style scoped>
:slotted(table tbody tr td:first-child) {
  font-weight: bold;
}
</style>
