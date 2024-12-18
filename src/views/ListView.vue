<template>
  <div class="list-view">
    <TableComponent :auth-token="authToken" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TableComponent from '@/components/TableComponent.vue';

const router = useRouter();
const authToken = ref(localStorage.getItem('authToken') || '');

// Redirect if no token
onMounted(() => {
  if (!authToken.value) {
    router.push('/login');
  }
});
</script>

<style scoped>
.list-view {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
