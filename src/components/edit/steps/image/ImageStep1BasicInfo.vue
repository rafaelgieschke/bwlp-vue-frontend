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

    <!-- <div class="field border">
      <label>Tags</label>
      <div class="tag-container">
        <div
          v-for="(tag, index) in modelValue.tags"
          :key="index"
          class="tag secondary"
        >
          {{ tag }}
          <button type="button" @click="removeTag(index)">×</button>
        </div>
        <div class="add-tag">
          <input
            v-model="newTag"
            @keyup.enter="addTag"
            placeholder="Add a tag"
          />
          <button type="button" @click="addTag">+</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';

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

// const newTag = ref('');

// const addTag = () => {
//   if (
//     newTag.value.trim() &&
//     !props.modelValue.tags.includes(newTag.value.trim())
//   ) {
//     const updatedData = {
//       ...props.modelValue,
//       tags: [...props.modelValue.tags, newTag.value.trim()],
//     };
//     emit('update:modelValue', updatedData);
//     newTag.value = '';	/home/julien/.config/vivaldi/Default

//   }
// };

// const removeTag = index => {
//   const updatedTags = [...props.modelValue.tags];
//   updatedTags.splice(index, 1);

//   const updatedData = {
//     ...props.modelValue,
//     tags: updatedTags,
//   };
//   emit('update:modelValue', updatedData);
// };
</script>

<!-- <style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 16px;
  font-size: 0.9rem;
}

.tag button {
  margin-left: 5px;
  border: none;
  background: none;
  cursor: pointer;
}

.add-tag {
  display: flex;
  align-items: center;
}

.add-tag input {
  margin-right: 5px;
  padding: 5px;
  border: 1px dashed #ccc;
  border-radius: 16px;
}
</style> -->
