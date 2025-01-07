<template>
  <article class="bw-card">
    <header>
      <h3>
        <slot name="header"></slot>
      </h3>
    </header>
    <div>
      <slot name="content"></slot>
    </div>
  </article>
</template>

<script setup>
const props = defineProps(['title', 'subtitle', 'content']);
</script>

<style scoped>
.bw-card {
  margin: 20px 0;
  padding: 20px;
  border-radius: 24px;
  background-color: #272726;
  color: whitesmoke;

  header {
    margin-bottom: 1rem;
    border-bottom: 1px solid #4d4d4d;
  }

  h3 {
    font-size: 1.75rem;
  }
}
</style>
