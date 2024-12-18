<template>
  <header>
    <h1>Baden-Württemberg Lehrpool</h1>
  </header>

  <main>
    <article>
      <FormComponent v-if="!authToken" @login-success="handleLoginSuccess" />
      <TableComponent v-if="authToken" :auth-token="authToken" />
    </article>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import FormComponent from './components/FormComponent.vue';
import TableComponent from './components/TableComponent.vue';

const authToken = ref('');

const handleLoginSuccess = response => {
  authToken.value = response.authToken;
};
</script>

<style scoped>
header,
main {
  max-width: 1280px;
  margin: 0 auto;
}

main article {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
