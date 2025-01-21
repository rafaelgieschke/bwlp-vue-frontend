<template>
  <nav class="wrap">
    <button @click="store.toggleMode()" class="m l chip circle small">
      <i>{{ store.isDark ? 'light_mode' : 'dark_mode' }}</i>
    </button>

    <button class="chip circle">
      <i>palette</i>
      <input
        type="color"
        :value="store.currentColor"
        @input="handleColorPick"
      />
    </button>

    <button class="chip circle">
      <i>upload</i>
      <input type="file" accept="image/*" @change="handleFileUpload" />
    </button>

    <button
      v-for="(color, name) in store.colors"
      :key="name"
      :class="['circle', 'small', name]"
      @click="store.setTheme(name)"
      data-ui="#theme-dialog"
    ></button>
  </nav>
</template>

<script setup>
import {onMounted} from 'vue';
import {useThemeStore} from '@/stores/theme';

const store = useThemeStore();

const handleColorPick = async event => {
  await store.setCustomColor(event.target.value);
};

const handleFileUpload = async event => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    await store.setCustomImage(imageUrl);
  }
};

onMounted(() => {
  store.loadPersistedState();
});
</script>
