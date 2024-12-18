<template>
  <div class="login-view">
    <h2>Login</h2>

    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth-store';

import { MasterServerClient } from '@/assets/js/bwlp/bwlp.js';
import { Thrift } from '@/assets/js/thrift/thrift.js';

const router = useRouter();
const authStore = useAuthStore();

const mainServer = 'bwlp-masterserver.ruf.uni-freiburg.de';

const proto = new Thrift.Protocol(
  new Thrift.Transport(`https://${mainServer}/thrift/`),
);
const main = new MasterServerClient(proto);

const username = ref('');
const password = ref('');
const error = ref('');

const login = async () => {
  try {
    const response = await main.localAccountLogin(
      username.value,
      password.value,
    );

    // Use the store to set the token
    authStore.setToken(response.authToken);

    // Navigate to list view
    router.push('/list');
  } catch (e) {
    error.value = e.message;
  }
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

form {
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

form div {
  display: grid;
}

form input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

form button {
  justify-self: center;
  width: 8rem;
  min-width: fit-content;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #f0f0f0;
  cursor: pointer;
}

form button:hover {
  background-color: #e0e0e0;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
