<template>
  <article>
    <section v-if="!authToken">
      <h1>Login</h1>
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
  </article>
</template>

<script setup>
import { ref } from "vue";
import { MasterServerClient, SatelliteServerClient } from "@/assets/js/bwlp/bwlp.js";
import { Thrift } from "@/assets/js/thrift/thrift.js";

const mainServer = 'bwlp-masterserver.ruf.uni-freiburg.de';
const sat1Server = 'bwlp-pxe.ruf.uni-freiburg.de';

const proto = new Thrift.Protocol(
  new Thrift.Transport(`https://${mainServer}/thrift/`),
);
const main = new MasterServerClient(proto);

const proto2 = new Thrift.Protocol(
  new Thrift.Transport(`https://${sat1Server}/thrift/`),
);
const sat = new SatelliteServerClient(proto2);

const username = ref("");
const password = ref("");
const authToken = ref("");
const userInfo = ref("");
const error = ref("");

const login = async () => {
  try {
    const response = await main.localAccountLogin(username.value, password.value);
    authToken.value = response.authToken;
    userInfo.value = response.userInfo;
    saveLoginData();
    getImages();
  } catch (e) {
    error.value = e.message;
  }
};

const imageList = ref([]);
const getImages = async () => {
  try {
    console.log("authToken", authToken.value);
    const response = await sat.getImageList(authToken.value, [], 0);
    imageList.value = response;
  } catch (e) {
    error.value = e.message;
  }
};

const saveLoginData = () => {
  localStorage.setItem("username", username.value);
  localStorage
    .setItem("password", password.value);
};

if (localStorage.getItem("username")) {
  username.value = localStorage.getItem("username");
  password.value = localStorage.getItem("password");

  login();
}
</script>

<style scoped>
.list {
  margin-inline: auto;
  width: fit-content;
}

thead,
tfoot {
  background: url(@/assets/img/leopardskin.jpg);
  color: white;
  text-shadow: 1px 1px 1px black;
}

thead th,
tfoot th,
tfoot td {
  background: linear-gradient(to bottom, rgb(0 0 0 / 10%), rgb(0 0 0 / 50%));
  border: 3px solid purple;
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
