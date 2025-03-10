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

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

import {useOperatingSystems} from '@/composables/useOperatingSystems';

const {fetchOperatingSystems} = useOperatingSystems();

const osList = ref([]);

onMounted(async () => {
  osList.value = await fetchOperatingSystems();
});
</script>
