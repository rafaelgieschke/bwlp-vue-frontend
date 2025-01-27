import {getCurrentInstance} from 'vue';

export function useSat1Server() {
  const app = getCurrentInstance();
  return app.proxy.$sat1Server;
}
