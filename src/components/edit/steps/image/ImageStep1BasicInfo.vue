<template>
  <div class="step-basic-info">
    <div class="field label border">
      <input v-model="modelValue.imageName" required />
      <label>Image Name</label>
    </div>

    <div class="field textarea label border">
      <textarea v-model="modelValue.description" rows="4"></textarea>
      <label>Description</label>
    </div>

    <div class="field label border">
      <select v-model="modelValue.osId">
        <option v-for="os in osList" :key="os.osId" :value="os.osId">
          {{ os.osName }}
        </option>
      </select>
      <label>Operating System</label>
    </div>

    <div class="field label border">
      <select v-model="modelValue.shareMode" @change="updateShareMode">
        <option :value="0">Private</option>
        <option :value="1">Public</option>
        <option :value="2">Custom</option>
      </select>
      <label>Share Mode</label>
    </div>

    <div class="field label border">
      <select v-model="modelValue.virtId">
        <option value="vmware">VMware</option>
        <option value="virtualbox">VirtualBox</option>
        <option value="kvm">KVM</option>
      </select>
      <label>Virtualization Type</label>
    </div>

    <SwitchTitle title="Is template" v-model="modelValue.isTemplate" />
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

import SwitchTitle from '@/components/edit/steps/SwitchTitle.vue';

defineModel({
  modelValue: {
    type: Object,
  },
});

import {useOperatingSystems} from '@/composables/useOperatingSystems';

const {fetchOperatingSystems} = useOperatingSystems();

const osList = ref([]);

onMounted(async () => {
  osList.value = await fetchOperatingSystems();
});

const updateShareMode = event => {
  const shareMode = parseInt(event.target.value);
  const updatedData = {
    ...props.modelValue,
    shareMode,
  };
  modelValue = updatedData;
};
</script>
