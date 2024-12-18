import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref(localStorage.getItem('authToken') || '');

  function setToken(token) {
    authToken.value = token;
    localStorage.setItem('authToken', token);
  }

  function clearToken() {
    authToken.value = '';
    localStorage.removeItem('authToken');
  }

  return {authToken, setToken, clearToken};
});
