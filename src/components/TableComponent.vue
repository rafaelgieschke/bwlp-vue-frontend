<template>
  <section class="list" v-if="imageList.length > 0">
    <h2>Images</h2>

    <table>
      <thead>
        <tr>
          <th>Image Name</th>
          <th>Creation Time</th>
          <th>File Size</th>
          <th>Owner</th>
          <th class="aber-hidden">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="image in imageList" :key="image">
          <td>{{ image.imageName }}</td>
          <td>{{ new Date(image.createTime * 1000).toJSON() }}</td>
          <td>{{ image.fileSize }}</td>
          <td>{{ image.ownerId }}</td>
          <td><button>Delete</button></td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <th colspan="5">Total Images: {{ imageList.length }}</th>
        </tr>
      </tfoot>
    </table>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { SatelliteServerClient } from '@/assets/js/bwlp/bwlp.js';
import { Thrift } from '@/assets/js/thrift/thrift.js';

const sat1Server = 'bwlp-pxe.ruf.uni-freiburg.de';

const proto2 = new Thrift.Protocol(
  new Thrift.Transport(`https://${sat1Server}/thrift/`),
);
const sat = new SatelliteServerClient(proto2);

const props = defineProps({
  authToken: {
    type: String,
    required: true,
  },
});

const imageList = ref([]);
const error = ref('');

const fetchImages = async () => {
  try {
    const response = await sat.getImageList(props.authToken, [], 0);
    imageList.value = response;
  } catch (e) {
    error.value = e.message;
  }
};

// Fetch images when component is created
fetchImages();
</script>

<style scoped>
thead,
tfoot {
  background: url(@/assets/img/leopardskin.jpg);
  color: white;
  text-shadow: 1px 1px 1px black;
}

thead th,
tfoot th,
tfoot td {
  border: 3px solid purple;
  background: linear-gradient(to bottom, rgb(0 0 0 / 10%), rgb(0 0 0 / 50%));
}

tbody tr:nth-child(odd) {
  background-color: #ff33cc;
}

tbody tr:nth-child(even) {
  background-color: #e495e4;
}

tbody tr {
  background-image: url(@/assets/img/noise.png);
}

table {
  background-color: #ff33cc;
}

th {
  letter-spacing: 2px;
}

td {
  letter-spacing: 1px;
}

tbody td {
  text-align: center;
}

tfoot th {
  text-align: center;
}

th,
td {
  padding: 10px;
}

.aber-hidden {
  display: none;
}
</style>
