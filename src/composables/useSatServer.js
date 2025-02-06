import {getCurrentInstance} from 'vue';

import {Thrift} from '@/assets/js/thrift/thrift.js';
import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';

export function useSatServer() {
  const app = getCurrentInstance();
  const sat1Server = app.proxy.$sat1Server;

  const proto2 = new Thrift.Protocol(
    new Thrift.Transport(`https://${sat1Server}/thrift/`),
  );
  return new SatelliteServerClient(proto2);
}
