<template>
  <div>
    <ErrorMessage
      v-if="error"
      :error="error"
      default-message="Unable to load or update lecture"
    />

    <h1>Edit {{ itemData.lectureName }}</h1>

    <form @submit.prevent="saveItem">
      <!-- Progress indicator -->
      <nav class="bottom-margin">
        <div class="tabs">
          <a :class="{active: currentStep === 1}" @click="currentStep = 1">
            <i>info</i>Basic Info
          </a>
          <a :class="{active: currentStep === 2}" @click="currentStep = 2">
            <i>key</i>Permissions
          </a>
          <a :class="{active: currentStep === 3}" @click="currentStep = 3">
            <i>wifi</i>Network
          </a>
          <a :class="{active: currentStep === 4}" @click="currentStep = 4">
            <i>settings</i>Advanced
          </a>
        </div>
      </nav>

      <!-- Step 1: Basic Info -->
      <div v-show="currentStep === 1">
        <div class="field label border">
          <input v-model="itemData.lectureName" required />
          <label>Lecture Name</label>
        </div>
        <div class="field textarea label border">
          <textarea v-model="itemData.description"></textarea>
          <label>Description</label>
        </div>
        <div class="field label border">
          <input type="datetime-local" v-model="startDateTime" required />
          <label>Start Time</label>
        </div>
        <div class="field label border">
          <input type="datetime-local" v-model="endDateTime" required />
          <label>End Time</label>
        </div>
      </div>

      <!-- Step 2: Permissions -->
      <div v-show="currentStep === 2">
        <div class="field">
          <label class="switch">
            <input type="checkbox" v-model="itemData.isEnabled" />
            <span>Enabled</span>
          </label>
        </div>
        <div class="field">
          <label class="switch">
            <input type="checkbox" v-model="itemData.isExam" />
            <span>Exam Mode</span>
          </label>
        </div>
        <div class="field">
          <label class="switch">
            <input type="checkbox" v-model="itemData.defaultPermissions" />
            <span>Allow Edit</span>
          </label>
        </div>
        <div class="field">
          <label class="switch">
            <input type="checkbox" v-model="itemData.defaultPermissions" />
            <span>Allow Admin</span>
          </label>
        </div>
      </div>

      <!-- Step 3: Network -->
      <div v-show="currentStep === 3">
        <div class="field">
          <label class="switch">
            <input type="checkbox" v-model="itemData.hasInternetAccess" />
            <span>Internet Access</span>
          </label>
        </div>
        <div class="field">
          <label class="switch">
            <input type="checkbox" v-model="itemData.hasUsbAccess" />
            <span>USB Access</span>
          </label>
        </div>
      </div>

      <!-- Step 4: Advanced -->
      <div v-show="currentStep === 4">
        <div class="field">
          <label class="switch">
            <input type="checkbox" v-model="itemData.autoUpdate" />
            <span>Auto Update</span>
          </label>
        </div>
        <div class="field">
          <label class="switch">
            <input type="checkbox" v-model="itemData.limitToLocations" />
            <span>Limit to Locations</span>
          </label>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="buttons">
        <button
          type="button"
          class="border"
          @click="prevStep"
          v-if="currentStep > 1"
        >
          <i>arrow_back</i>Previous
        </button>
        <button
          type="button"
          class="border"
          @click="nextStep"
          v-if="currentStep < 4"
        >
          Next<i>arrow_forward</i>
        </button>
        <button type="submit" class="primary" v-if="currentStep === 4">
          <i>save</i>Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import ErrorMessage from '@/components/error/ErrorMessage.vue';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

import {useSatServer} from '@/composables/useSatServer';
const sat = useSatServer();

const itemData = ref({});
const error = ref(null);
const currentStep = ref(1);

const startDateTime = computed({
  get: () => {
    if (!itemData.value.startTime) return '';
    return new Date(itemData.value.startTime * 1000).toISOString().slice(0, 16);
  },
  set: value => {
    itemData.value.startTime = Math.floor(new Date(value).getTime() / 1000);
  },
});

const endDateTime = computed({
  get: () => {
    if (!itemData.value.endTime) return '';
    return new Date(itemData.value.endTime * 1000).toISOString().slice(0, 16);
  },
  set: value => {
    itemData.value.endTime = Math.floor(new Date(value).getTime() / 1000);
  },
});

const nextStep = () => {
  if (currentStep.value < 4) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

onMounted(async () => {
  try {
    itemData.value = await sat.getLectureDetails(
      authStore.authToken,
      route.params.id,
    );
  } catch (err) {
    console.error('Failed to fetch lecture details:', err);
    error.value = err;
  }
});

const saveItem = async () => {
  try {
    await sat.updateLecture(
      authStore.authToken,
      itemData.value.lectureId,
      itemData.value,
    );
    router.push('/lecture');
  } catch (err) {
    console.error('Failed to update lecture:', err);
    error.value = err;
  }
};
</script>

<style scoped>
.buttons {
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
}
form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
