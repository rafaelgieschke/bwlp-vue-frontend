<template>
  <div class="login-view">
    <FormComponent @login-success="handleLoginSuccess" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import FormComponent from '@/components/FormComponent.vue';

const router = useRouter();

const handleLoginSuccess = (response) => {
  // Store token in localStorage or state management
  localStorage.setItem('authToken', response.authToken);
  // Navigate to list view
  router.push('/list');
};
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}
</style>
