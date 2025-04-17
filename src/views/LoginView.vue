<template>
  <div class="login-view">
    <h2>Login</h2>

    <form @submit.prevent="login">
      <div class="field label round border">
        <input type="text" id="username" v-model="username" required />
        <label>Username</label>
      </div>

      <div class="field label round border">
        <input type="password" id="password" v-model="password" required />
        <label>Password</label>
      </div>

      <button type="submit">Login</button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from '@vue/runtime-core';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import {MasterServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';

const router = useRouter();
const authStore = useAuthStore();

const mainServer = 'bwlp-masterserver.ruf.uni-freiburg.de';

const proto = new Thrift.Protocol(new Thrift.Transport(`https://${mainServer}/thrift/`));
const main = new MasterServerClient(proto);

const username = ref('');
const password = ref('');
const error = ref('');

const login = async () => {
  try {
    const response = await main.localAccountLogin(username.value, password.value);

    authStore.setToken(response.authToken);

    router.push('/image');
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
  inline-size: 320px;
  margin-inline: auto;

  button {
    display: flex;
    margin-inline: auto;
  }
}
</style>
