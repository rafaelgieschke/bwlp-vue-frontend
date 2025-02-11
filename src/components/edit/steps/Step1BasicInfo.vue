<template>
  <div class="step-basic-info">
    <div class="field label border">
      <input v-model="modelValue.lectureName" required />
      <label>Lecture Name</label>
    </div>
    <div class="field textarea label border">
      <textarea v-model="modelValue.description"></textarea>
      <label>Description</label>
    </div>
    <div class="field label border">
      <input
        type="datetime-local"
        :value="startDateTime"
        @input="updateStartTime"
        required
      />
      <label>Start Time</label>
    </div>
    <div class="field label border">
      <input
        type="datetime-local"
        :value="endDateTime"
        @input="updateEndTime"
        required
      />
      <label>End Time</label>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const startDateTime = computed({
  get: () => {
    if (!props.modelValue.startTime) return '';
    return new Date(props.modelValue.startTime * 1000)
      .toISOString()
      .slice(0, 16);
  },
  set: value => {
    const data = {...props.modelValue};
    data.startTime = Math.floor(new Date(value).getTime() / 1000);
    emit('update:modelValue', data);
  },
});

const endDateTime = computed({
  get: () => {
    if (!props.modelValue.endTime) return '';
    return new Date(props.modelValue.endTime * 1000).toISOString().slice(0, 16);
  },
  set: value => {
    const data = {...props.modelValue};
    data.endTime = Math.floor(new Date(value).getTime() / 1000);
    emit('update:modelValue', data);
  },
});

const updateStartTime = e => (startDateTime.value = e.target.value);
const updateEndTime = e => (endDateTime.value = e.target.value);
</script>
