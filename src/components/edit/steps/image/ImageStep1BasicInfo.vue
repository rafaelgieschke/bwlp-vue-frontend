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
        <option v-for="os in osList" :key="os.id" :value="os.id">
          {{ os.name }}
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

    <div class="field checkbox border">
      <input type="checkbox" id="isTemplate" v-model="modelValue.isTemplate" />
      <label for="isTemplate">Template Image</label>
    </div>

    <div class="field border">
      <label>Tags</label>
      <div class="tag-container">
        <div v-for="(tag, index) in modelValue.tags" :key="index" class="tag">
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
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

// Simulated OS list - replace with actual data from API
const osList = ref([
  {id: 18, name: 'Windows 10'},
  {id: 19, name: 'Windows 11'},
  {id: 10, name: 'Ubuntu 20.04'},
  {id: 11, name: 'Ubuntu 22.04'},
  {id: 5, name: 'macOS Monterey'},
  {id: 6, name: 'macOS Ventura'},
]);

const newTag = ref('');

const addTag = () => {
  if (
    newTag.value.trim() &&
    !props.modelValue.tags.includes(newTag.value.trim())
  ) {
    const updatedData = {
      ...props.modelValue,
      tags: [...props.modelValue.tags, newTag.value.trim()],
    };
    emit('update:modelValue', updatedData);
    newTag.value = '';
  }
};

const removeTag = index => {
  const updatedTags = [...props.modelValue.tags];
  updatedTags.splice(index, 1);

  const updatedData = {
    ...props.modelValue,
    tags: updatedTags,
  };
  emit('update:modelValue', updatedData);
};
</script>

<style scoped>
.step-basic-info {
  padding: 1rem;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 16px;
  background: #eee;
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
</style>
