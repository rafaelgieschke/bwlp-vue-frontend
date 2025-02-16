<template>
  <div class="field middle-align">
    <nav>
      <div class="max">
        <h6>{{ title }}</h6>
        <div v-if="description">{{ description }}</div>
      </div>
      <label class="switch">
        <input
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
        />
        <span></span>
      </label>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>
