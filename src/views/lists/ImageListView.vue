<template>
  <section class="scroll">
    <table v-if="imageList.length > 0" class="stripes">
      <thead>
        <tr>
          <th>Image Name</th>
          <th>Creation Time</th>
          <th>File Size</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="image in imageList"
          @click="openModal(image)"
          :key="image.imageBaseId"
          :id="image.imageBaseId"
        >
          <td>{{ image.imageName }}</td>
          <td class="min">
            {{ $dayjs(image.createTime * 1000).format('DD.MM.YYYY HH:mm:ss') }}
          </td>
          <td>{{ image.fileSize }}</td>
          <td>{{ image.ownerId }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="100%">Total Images: {{ imageList.length }}</th>
        </tr>
      </tfoot>
    </table>
  </section>

  <DetailDialog :is-open="showModal" :title="selectedImage?.imageName || ''">
    <template #page1>
      <div v-if="selectedImage">
        <table class="stripes">
          <tbody>
            <tr>
              <td>Beschreibung</td>
              <td colspan="3">{{ selectedImage.description }}</td>
            </tr>
            <tr>
              <td>Besitzer</td>
              <!-- Get owner name here -->
              <td colspan="3">{{ selectedImage.ownerId }}</td>
            </tr>
            <tr>
              <td>Erstellt am</td>
              <td colspan="3">
                {{
                  $dayjs(selectedImage.createTime * 1000).format(
                    'DD.MM.YYYY, HH:mm',
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>Geändert am</td>
              <td>
                {{
                  $dayjs(selectedImage.updateTime * 1000).format(
                    'DD.MM.YYYY, HH:mm',
                  )
                }}
              </td>

              <td>durch</td>
              <!-- Get updater name here -->
              <td>{{ selectedImage.updaterId }}</td>
            </tr>
            <tr>
              <td>Betriebssystem</td>
              <td colspan="3">{{ selectedImage.osId }} (get the thing)</td>
            </tr>
            <tr>
              <td>Freigabemodus</td>
              <td colspan="2">{{ selectedImage.shareMode }} (get the thing)</td>
              <td>Here is a checkbox for some reason</td>
            </tr>
            <tr>
              <td>Versions-ID</td>
              <td colspan="3">{{ selectedImage.latestVersionId }}</td>
            </tr>
            <tr>
              <td>VM-ID</td>
              <td colspan="3">{{ selectedImage.imageBaseId }}</td>
            </tr>
            <tr>
              <td>Virtualisierer</td>
              <td colspan="3">{{ selectedImage.virtId }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #page2>
      <div v-if="selectedImage">
        <table class="stripes">
          <thead>
            <tr>
              <th>Erstellungszeitpunkt</th>
              <th>Ablaufszeitpunkt</th>
              <th>Ersteller</th>
              <th>Verwendbar</th>
              <th>Größe</th>
              <th>Interne ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="version in selectedImage.versions">
              <td>
                {{
                  $dayjs(version.createTime * 1000).format('DD.MM.YYYY, HH:mm')
                }}
              </td>
              <td>
                {{
                  $dayjs(version.expireTime * 1000).format('DD.MM.YYYY, HH:mm')
                }}
              </td>
              <td>{{ version.uploaderId }}</td>
              <td>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    :checked="version.isRestricted"
                    disabled
                  />
                  <span>{{
                    version.isRestricted ? 'Verwendbar' : 'Nicht verwendbar'
                  }}</span>
                </label>
              </td>
              <td>
                {{ humanFileSize(version.fileSize) }}
              </td>
              <td>{{ version.versionId }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #page3>
      <div v-if="selectedImage">
        <table class="stripes">
          <thead>
            <tr>
              <th>Benutzer</th>
              <th>Verlinken</th>
              <th>Download</th>
              <th>Bearbeiten</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, user_info) in imagePermissions" :key="user">
              <td class="max">{{ user_info }} (get the user's info)</td>
              <td v-for="permission in user" class="min">
                <label class="checkbox">
                  <input type="checkbox" :checked="permission" disabled />
                  <span></span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>

        <section>
          <h6>Andere Nutzer</h6>
          <p>
            Hier können Sie die Rechte für nicht in der Liste angegebene Nutzer
            festlegen
          </p>
          <label
            v-for="(
              defaultPermission, label
            ) in selectedImage.defaultPermissions"
            :key="defaultPermission"
            class="checkbox"
          >
            <input type="checkbox" :checked="defaultPermission" disabled />
            <span class="capitalize">{{ label }}</span>
          </label>
        </section>
      </div>
    </template>
  </DetailDialog>

  <p v-if="error" class="error-message">{{ error }}</p>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import {SatelliteServerClient} from '@/assets/js/bwlp/bwlp.js';
import {Thrift} from '@/assets/js/thrift/thrift.js';
import DetailDialog from '@/components/DetailDialog.vue';

const router = useRouter();
const authStore = useAuthStore();

const sat1Server = 'bwlp-pxe.ruf.uni-freiburg.de';

const proto2 = new Thrift.Protocol(
  new Thrift.Transport(`https://${sat1Server}/thrift/`),
);
const sat = new SatelliteServerClient(proto2);

const imageList = ref([]);
const error = ref('');
const showModal = ref(false);
const selectedImage = ref(null);
const imagePermissions = ref(null);

onMounted(() => {
  if (!authStore.authToken) {
    router.push('/login');
  } else {
    fetchImages();
  }
});

const fetchImages = async () => {
  try {
    const response = await sat.getImageList(authStore.authToken, [], 0);
    imageList.value = response;
  } catch (e) {
    error.value = e.message;
  }
};

const openModal = async image => {
  try {
    selectedImage.value = await sat.getImageDetails(
      authStore.authToken,
      image.imageBaseId,
    );
    imagePermissions.value = await sat.getImagePermissions(
      authStore.authToken,
      image.imageBaseId,
    );
  } catch (e) {
    error.value = e.message;
  }

  showModal.value = true;

  const dialog = document.querySelector('dialog');
  dialog.showModal();
};

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
function humanFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + ' ' + units[u];
}
</script>
