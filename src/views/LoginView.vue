<template>
  <div class="login-view">
    <h2>Login</h2>

    <form @submit.prevent="login">
      <mdui-text-field
        label="Username"
        id="username"
        v-model="username"
        required
      />
      <mdui-text-field
        label="Password"
        id="password"
        v-model="password"
        required
      />
      <mdui-button type="submit">Login</mdui-button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import {MasterServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';

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
}

form {
  display: grid;
  width: 100%;
  max-width: 300px;
  gap: 1rem;

  div {
    display: grid;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  button {
    justify-self: center;
    width: 8rem;
    min-width: fit-content;
    padding: 0.5rem 1rem;
  }
}
</style>
