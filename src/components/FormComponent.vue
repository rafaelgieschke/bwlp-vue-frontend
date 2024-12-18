<template>
  <section v-if="!authToken">
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
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { MasterServerClient } from '@/assets/js/bwlp/bwlp.js';
import { Thrift } from '@/assets/js/thrift/thrift.js';

const mainServer = 'bwlp-masterserver.ruf.uni-freiburg.de';

const proto = new Thrift.Protocol(
  new Thrift.Transport(`https://${mainServer}/thrift/`),
);
const main = new MasterServerClient(proto);

const props = defineProps({
  onLoginSuccess: {
    type: Function,
    required: true,
  },
});

const username = ref('');
const password = ref('');
const authToken = ref('');
const userInfo = ref('');
const error = ref('');

const login = async () => {
  try {
    const response = await main.localAccountLogin(
      username.value,
      password.value,
    );
    authToken.value = response.authToken;
    userInfo.value = response.userInfo;
    props.onLoginSuccess(response);
  } catch (e) {
    error.value = e.message;
  }
};
</script>

<style scoped>
form {
  display: grid;
  gap: 1rem;

  div {
    display: grid;

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
    }
  }

  button {
    justify-self: center;
    width: 8rem;
    min-width: fit-content;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: #f0f0f0;
    cursor: pointer;

    &:hover {
      background-color: #e0e0e0;
    }
  }
}
</style>
