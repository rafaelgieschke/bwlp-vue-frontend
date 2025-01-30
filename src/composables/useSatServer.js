import {useSat1Server} from '@/composables/useSat1Server';
import {Thrift} from '@/assets/js/thrift/thrift.js';
import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';

export function useSatServer() {
  const sat1Server = useSat1Server();
  const proto2 = new Thrift.Protocol(
    new Thrift.Transport(`https://${sat1Server}/thrift/`),
  );
  return new SatelliteServerClient(proto2);
}
